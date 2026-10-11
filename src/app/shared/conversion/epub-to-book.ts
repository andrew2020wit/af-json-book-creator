import { IBookJson } from '../../../models/book-json.interface';
import { IBookHeader, IBookParagraph } from '../../../models/book.interface';
import { decodeXmlBytes, resolveArchivePath, ZipArchive } from '../archive/zip-archive';
import { foreignReaderJsonContentDescription } from '../book-json/book-json.const';
import { getFileNameWithoutExtension } from '../book-json/file-names';
import { htmlToText } from './html-to-text';
import { splitTextToParagraphs } from './split-text';

export class EpubConversionError extends Error {
  override readonly name = 'EpubConversionError';
}

interface ManifestItem {
  id: string;
  path: string;
  mediaType: string;
  properties: string[];
}

interface PackageDocument {
  path: string;
  title: string;
  creator: string;
  manifestItems: Map<string, ManifestItem>;
  spineItems: ManifestItem[];
  ncxItem: ManifestItem | null;
}

const opsNamespace = 'http://www.idpf.org/2007/ops';
const chapterMediaTypes = new Set(['application/xhtml+xml', 'text/html']);

/**
 * Converts an EPUB file into a JSON Book (behavior of `epub-to-json` from `json-book-utils`).
 * `now` becomes the book id.
 */
export async function convertEpubToBook(
  fileName: string,
  bytes: Uint8Array,
  now: number,
): Promise<IBookJson> {
  const zipArchive = await ZipArchive.open(bytes);
  const packageDocument = readPackageDocument(zipArchive);
  const chapterTitles = readChapterTitles(zipArchive, packageDocument);

  const content: IBookParagraph[] = [];
  const headers: IBookHeader[] = [];

  for (const spineItem of packageDocument.spineItems) {
    if (!chapterMediaTypes.has(spineItem.mediaType)) {
      continue;
    }

    const chapterParagraphs = splitTextToParagraphs(
      readChapterText(zipArchive, spineItem),
      content.length,
    );

    const chapterTitle = chapterTitles.get(spineItem.path);

    if (chapterTitle && chapterParagraphs.length > 0) {
      headers.push({ id: chapterParagraphs[0].id, text: chapterTitle });
    }

    content.push(...chapterParagraphs);
  }

  return {
    jsonContentDescription: foreignReaderJsonContentDescription,
    book: {
      id: String(now),
      title: createBookTitle(packageDocument, fileName),
      content,
      markedItems: [],
      headers,
    },
  };
}

function readPackageDocument(zipArchive: ZipArchive): PackageDocument {
  const containerDocument = zipArchive.getXmlDocument('META-INF/container.xml');
  const packagePath = getElements(containerDocument, 'rootfile')[0]?.getAttribute('full-path');

  if (!packagePath) {
    throw new EpubConversionError('The EPUB has no package document.');
  }

  const opfDocument = zipArchive.getXmlDocument(packagePath);
  const manifestItems = new Map<string, ManifestItem>();

  for (const itemElement of getElements(opfDocument, 'item')) {
    const id = itemElement.getAttribute('id');
    const href = itemElement.getAttribute('href');

    if (!id || !href) {
      continue;
    }

    manifestItems.set(id, {
      id,
      path: resolveArchivePath(packagePath, href),
      mediaType: (itemElement.getAttribute('media-type') ?? '').toLowerCase(),
      properties: (itemElement.getAttribute('properties') ?? '').split(/\s+/),
    });
  }

  const spineElement = getElements(opfDocument, 'spine')[0];
  const spineItems: ManifestItem[] = [];

  for (const itemrefElement of getElements(opfDocument, 'itemref')) {
    const manifestItem = manifestItems.get(itemrefElement.getAttribute('idref') ?? '');

    if (manifestItem) {
      spineItems.push(manifestItem);
    }
  }

  const ncxItem =
    manifestItems.get(spineElement?.getAttribute('toc') ?? '') ??
    [...manifestItems.values()].find((item) => item.mediaType === 'application/x-dtbncx+xml') ??
    null;

  return {
    path: packagePath,
    title: getFirstElementText(opfDocument, 'title'),
    creator: getFirstElementText(opfDocument, 'creator'),
    manifestItems,
    spineItems,
    ncxItem,
  };
}

/** Chapter path → title from the table of contents (EPUB 3 nav, else NCX). The first entry wins. */
function readChapterTitles(
  zipArchive: ZipArchive,
  packageDocument: PackageDocument,
): Map<string, string> {
  const chapterTitles = new Map<string, string>();

  for (const tocEntry of readTocEntries(zipArchive, packageDocument)) {
    if (tocEntry.title && !chapterTitles.has(tocEntry.chapterPath)) {
      chapterTitles.set(tocEntry.chapterPath, tocEntry.title);
    }
  }

  return chapterTitles;
}

interface TocEntry {
  chapterPath: string;
  title: string;
}

/**
 * Entries of the EPUB 3 nav document, else of the NCX. A table of contents that is missing or
 * broken costs only the headers, not the whole book.
 */
function readTocEntries(zipArchive: ZipArchive, packageDocument: PackageDocument): TocEntry[] {
  const navItem = [...packageDocument.manifestItems.values()].find((item) =>
    item.properties.includes('nav'),
  );
  const navDocument = navItem ? readXhtmlDocument(zipArchive, navItem.path) : null;

  if (navItem && navDocument) {
    return readNavTocEntries(navDocument, navItem.path);
  }

  if (!packageDocument.ncxItem) {
    return [];
  }

  try {
    return readNcxTocEntries(zipArchive, packageDocument.ncxItem.path);
  } catch {
    return [];
  }
}

function readNavTocEntries(navDocument: Document, navPath: string): TocEntry[] {
  const navElements = getElements(navDocument, 'nav');
  const tocNavElement =
    navElements.find((navElement) => getEpubTypes(navElement).includes('toc')) ?? navElements[0];

  if (!tocNavElement) {
    return [];
  }

  return getElements(tocNavElement, 'a')
    .filter((anchorElement) => anchorElement.getAttribute('href'))
    .map((anchorElement) => ({
      chapterPath: resolveArchivePath(navPath, anchorElement.getAttribute('href') ?? ''),
      title: normalizeWhitespace(anchorElement.textContent ?? ''),
    }));
}

function readNcxTocEntries(zipArchive: ZipArchive, ncxPath: string): TocEntry[] {
  const ncxDocument = zipArchive.getXmlDocument(ncxPath);
  const tocEntries: TocEntry[] = [];

  // getElements returns navPoints in document order, which is the reading order of nested entries.
  for (const navPointElement of getElements(ncxDocument, 'navPoint')) {
    const childElements = Array.from(navPointElement.children);
    const navLabelElement = childElements.find((element) => element.localName === 'navLabel');
    const contentElement = childElements.find((element) => element.localName === 'content');
    const source = contentElement?.getAttribute('src');

    if (!source) {
      continue;
    }

    tocEntries.push({
      chapterPath: resolveArchivePath(ncxPath, source),
      title: normalizeWhitespace(navLabelElement?.textContent ?? ''),
    });
  }

  return tocEntries;
}

function readChapterText(zipArchive: ZipArchive, chapterItem: ManifestItem): string {
  const chapterDocument = readXhtmlDocument(zipArchive, chapterItem.path);

  if (!chapterDocument) {
    return '';
  }

  return htmlToText(getElements(chapterDocument, 'body')[0] ?? chapterDocument);
}

/**
 * Parses an XHTML file of the book. Invalid XHTML (e.g. HTML entities such as `&nbsp;`) falls
 * back to the lenient HTML parser. `null` if the archive has no such file.
 */
function readXhtmlDocument(zipArchive: ZipArchive, path: string): Document | null {
  try {
    return zipArchive.getXmlDocument(path, 'application/xhtml+xml');
  } catch {
    const bytes = zipArchive.getEntry(path);

    if (!bytes) {
      return null;
    }

    return new DOMParser().parseFromString(decodeXmlBytes(bytes), 'text/html');
  }
}

function createBookTitle(packageDocument: PackageDocument, fileName: string): string {
  if (!packageDocument.title) {
    return getFileNameWithoutExtension(fileName);
  }

  return packageDocument.creator
    ? `${packageDocument.creator} - ${packageDocument.title}`
    : packageDocument.title;
}

function getElements(root: Document | Element, localName: string): Element[] {
  return Array.from(root.getElementsByTagNameNS('*', localName));
}

function getFirstElementText(root: Document, localName: string): string {
  return normalizeWhitespace(getElements(root, localName)[0]?.textContent ?? '');
}

function getEpubTypes(element: Element): string[] {
  const epubType =
    element.getAttributeNS(opsNamespace, 'type') ?? element.getAttribute('epub:type');

  return (epubType ?? '').split(/\s+/);
}

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}
