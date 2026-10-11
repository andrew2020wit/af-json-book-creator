import { zipSync } from 'fflate';

export interface TestEpubChapter {
  fileName: string;
  /** Inner HTML of `<body>`. */
  body: string;
  /** Table of contents title; no TOC entry when omitted. */
  tocTitle?: string;
}

export interface TestEpubOptions {
  title?: string;
  creator?: string;
  chapters: TestEpubChapter[];
  tocType: 'nav' | 'ncx';
}

/** Builds a minimal EPUB (content in `OEBPS/`, chapters in `OEBPS/text/`). */
export function createTestEpub(options: TestEpubOptions): Uint8Array<ArrayBuffer> {
  const textEncoder = new TextEncoder();
  const files: Record<string, Uint8Array> = {
    mimetype: textEncoder.encode('application/epub+zip'),
    'META-INF/container.xml': textEncoder.encode(
      `<?xml version="1.0"?>
      <container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
        <rootfiles>
          <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
        </rootfiles>
      </container>`,
    ),
    'OEBPS/content.opf': textEncoder.encode(createPackageDocument(options)),
  };

  for (const chapter of options.chapters) {
    files[`OEBPS/text/${chapter.fileName}`] = textEncoder.encode(
      `<?xml version="1.0" encoding="utf-8"?>
      <html xmlns="http://www.w3.org/1999/xhtml"><head><title>${chapter.fileName}</title></head>
      <body>${chapter.body}</body></html>`,
    );
  }

  const tocChapters = options.chapters.filter((chapter) => chapter.tocTitle !== undefined);

  if (options.tocType === 'nav') {
    const items = tocChapters
      .map((chapter) => `<li><a href="text/${chapter.fileName}">${chapter.tocTitle}</a></li>`)
      .join('');

    files['OEBPS/nav.xhtml'] = textEncoder.encode(
      `<?xml version="1.0" encoding="utf-8"?>
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
      <head><title>Nav</title></head>
      <body><nav epub:type="toc"><ol>${items}</ol></nav></body></html>`,
    );
  } else {
    const navPoints = tocChapters
      .map(
        (chapter, index) =>
          `<navPoint id="np${index}" playOrder="${index + 1}">
            <navLabel><text>${chapter.tocTitle}</text></navLabel>
            <content src="text/${chapter.fileName}"/>
          </navPoint>`,
      )
      .join('');

    files['OEBPS/toc.ncx'] = textEncoder.encode(
      `<?xml version="1.0" encoding="utf-8"?>
      <ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
        <navMap>${navPoints}</navMap>
      </ncx>`,
    );
  }

  return new Uint8Array(zipSync(files));
}

function createPackageDocument(options: TestEpubOptions): string {
  const chapterItems = options.chapters
    .map(
      (chapter, index) =>
        `<item id="chapter${index}" href="text/${chapter.fileName}" media-type="application/xhtml+xml"/>`,
    )
    .join('');

  const tocItem =
    options.tocType === 'nav'
      ? '<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>'
      : '<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>';

  const itemrefs = options.chapters
    .map((_chapter, index) => `<itemref idref="chapter${index}"/>`)
    .join('');

  const metadata = [
    options.title === undefined ? '' : `<dc:title>${options.title}</dc:title>`,
    options.creator === undefined ? '' : `<dc:creator>${options.creator}</dc:creator>`,
  ].join('');

  return `<?xml version="1.0" encoding="utf-8"?>
    <package xmlns="http://www.idpf.org/2007/opf" version="3.0">
      <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">${metadata}</metadata>
      <manifest>${tocItem}${chapterItems}</manifest>
      <spine${options.tocType === 'ncx' ? ' toc="ncx"' : ''}>${itemrefs}</spine>
    </package>`;
}
