export class ZipArchiveError extends Error {
  override readonly name = 'ZipArchiveError';
}

/** Unpacked ZIP archive (EPUB, DOCX): entry path → bytes. */
export class ZipArchive {
  private readonly entriesByLowerCasePath = new Map<string, Uint8Array>();

  private constructor(private readonly entries: Record<string, Uint8Array>) {
    for (const [path, bytes] of Object.entries(entries)) {
      this.entriesByLowerCasePath.set(path.toLowerCase(), bytes);
    }
  }

  static async open(bytes: Uint8Array): Promise<ZipArchive> {
    const { unzipSync } = await import('fflate');

    try {
      return new ZipArchive(unzipSync(bytes));
    } catch {
      throw new ZipArchiveError('The file is not a valid ZIP archive.');
    }
  }

  /** Finds an entry by its exact path, then case-insensitively. */
  getEntry(path: string): Uint8Array | null {
    return this.entries[path] ?? this.entriesByLowerCasePath.get(path.toLowerCase()) ?? null;
  }

  getXmlDocument(path: string, mimeType: DOMParserSupportedType = 'application/xml'): Document {
    const bytes = this.getEntry(path);

    if (!bytes) {
      throw new ZipArchiveError(`The archive has no "${path}" entry.`);
    }

    return parseXml(decodeXmlBytes(bytes), mimeType);
  }
}

/** XML files are UTF-8 unless they start with a UTF-16 BOM. */
export function decodeXmlBytes(bytes: Uint8Array): string {
  if (bytes[0] === 0xff && bytes[1] === 0xfe) {
    return new TextDecoder('utf-16le').decode(bytes);
  }

  if (bytes[0] === 0xfe && bytes[1] === 0xff) {
    return new TextDecoder('utf-16be').decode(bytes);
  }

  return new TextDecoder('utf-8').decode(bytes);
}

export function parseXml(text: string, mimeType: DOMParserSupportedType): Document {
  const document = new DOMParser().parseFromString(text, mimeType);

  if (document.getElementsByTagName('parsererror').length > 0) {
    throw new ZipArchiveError('The file contains invalid XML.');
  }

  return document;
}

/** Resolves an `href` (URL-encoded, maybe with a fragment) against the path of the file it is in. */
export function resolveArchivePath(baseFilePath: string, href: string): string {
  const hrefPath = safeDecodeUri(href.split('#')[0]);
  const segments = hrefPath.startsWith('/') ? [] : baseFilePath.split('/').slice(0, -1);

  for (const segment of hrefPath.split('/')) {
    if (segment === '' || segment === '.') {
      continue;
    }

    if (segment === '..') {
      segments.pop();
    } else {
      segments.push(segment);
    }
  }

  return segments.join('/');
}

function safeDecodeUri(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
