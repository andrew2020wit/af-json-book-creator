/**
 * Minimal single-byte encoders for tests: browsers can decode legacy encodings,
 * but `TextEncoder` only produces UTF-8.
 */
export function encodeWindows1251(text: string): Uint8Array {
  return Uint8Array.from(text, (character) => {
    const codePoint = character.codePointAt(0) ?? 0;

    if (codePoint < 0x80) {
      return codePoint;
    }

    if (codePoint >= 0x0410 && codePoint <= 0x044f) {
      return codePoint - 0x0410 + 0xc0;
    }

    if (character === 'ё') {
      return 0xb8;
    }

    if (character === 'Ё') {
      return 0xa8;
    }

    throw new Error(`Character is not supported by the test encoder: ${character}`);
  });
}

export function encodeLatin1(text: string): Uint8Array {
  return Uint8Array.from(text, (character) => {
    const codePoint = character.codePointAt(0) ?? 0;

    if (codePoint > 0xff) {
      throw new Error(`Character is not supported by the test encoder: ${character}`);
    }

    return codePoint;
  });
}

export function encodeUtf16Le(text: string, withBom: boolean): Uint8Array {
  const bytes: number[] = withBom ? [0xff, 0xfe] : [];

  for (let i = 0; i < text.length; i++) {
    const codeUnit = text.charCodeAt(i);

    bytes.push(codeUnit & 0xff, codeUnit >> 8);
  }

  return Uint8Array.from(bytes);
}
