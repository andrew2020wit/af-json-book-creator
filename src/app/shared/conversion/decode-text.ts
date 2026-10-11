export class TextDecodingError extends Error {
  override readonly name = 'TextDecodingError';
}

/**
 * Decodes text file bytes into a string.
 * Order: BOM (UTF-8, UTF-16 LE/BE) → strict UTF-8 → encoding detected by `jschardet`.
 */
export async function decodeText(bytes: Uint8Array): Promise<string> {
  const bomEncoding = getBomEncoding(bytes);

  if (bomEncoding) {
    // TextDecoder drops the BOM by itself.
    return new TextDecoder(bomEncoding).decode(bytes);
  }

  const utf8Text = tryDecodeUtf8(bytes);

  if (utf8Text !== null) {
    return utf8Text;
  }

  const { detect } = await import('jschardet');
  const detectionResult = detect(bytes);

  if (!detectionResult.encoding) {
    throw new TextDecodingError('Could not detect the text encoding.');
  }

  let textDecoder: TextDecoder;

  try {
    textDecoder = new TextDecoder(detectionResult.encoding);
  } catch {
    throw new TextDecodingError(`Unsupported text encoding: ${detectionResult.encoding}.`);
  }

  return textDecoder.decode(bytes);
}

function getBomEncoding(bytes: Uint8Array): string | null {
  if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
    return 'utf-8';
  }

  if (bytes[0] === 0xff && bytes[1] === 0xfe) {
    return 'utf-16le';
  }

  if (bytes[0] === 0xfe && bytes[1] === 0xff) {
    return 'utf-16be';
  }

  return null;
}

function tryDecodeUtf8(bytes: Uint8Array): string | null {
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}
