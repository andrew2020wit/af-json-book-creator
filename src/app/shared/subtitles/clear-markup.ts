const namedEntities: Readonly<Record<string, string>> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  lrm: '',
  rlm: '',
};

/**
 * Removes markup from cue text: HTML-like tags (`<i>`, `<font color="red">`, WebVTT `<c.yellow>`,
 * `<v Bob>`, `<00:01.000>`), ASS override blocks (`{\an8}`), and decodes HTML entities (`&amp;`).
 */
export function clearMarkup(text: string): string {
  return text
    .replaceAll(/<[^>]*>/g, '')
    .replaceAll(/\{\\[^}]*\}/g, '')
    .replaceAll(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, name: string) =>
      decodeEntity(entity, name),
    );
}

function decodeEntity(entity: string, name: string): string {
  if (name.startsWith('#')) {
    const isHex = name[1] === 'x' || name[1] === 'X';
    const codePoint = Number.parseInt(name.slice(isHex ? 2 : 1), isHex ? 16 : 10);

    return codePoint > 0 && codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : entity;
  }

  return namedEntities[name.toLowerCase()] ?? entity;
}
