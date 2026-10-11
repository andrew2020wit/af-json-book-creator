/**
 * Markers of the `.to-translate.docx` file, compatible with `create-docx-to-translate` from
 * `json-book-utils`: `[[[[<book id>]]]]` and `[[[<paragraph id>]]](((<line index>)))`.
 */

export function createBookIdMarker(bookId: string): string {
  return `[[[[${bookId}]]]]`;
}

export function createLineMarker(paragraphId: number, lineIndex: number): string {
  return `[[[${paragraphId}]]](((${lineIndex})))`;
}

// Google Translate may add spaces inside markers or replace brackets with full-width ones.
const openSquare = '[\\[［【〔]';
const closeSquare = '[\\]］】〕]';
const openRound = '[(（]';
const closeRound = '[)）]';

const bookIdMarkerPattern = new RegExp(
  `^${repeat(openSquare, 4)}\\s*(.*?)\\s*${repeat(closeSquare, 4)}$`,
);

const lineMarkerPattern = new RegExp(
  `^${repeat(openSquare, 3)}\\s*(\\d+)\\s*${repeat(closeSquare, 3)}\\s*` +
    `${repeat(openRound, 3)}\\s*(\\d+)\\s*${repeat(closeRound, 3)}\\s*(.*)$`,
  's',
);

export function parseBookIdMarker(text: string): string | null {
  return bookIdMarkerPattern.exec(text.trim())?.[1] ?? null;
}

export interface ParsedLineMarker {
  paragraphId: number;
  lineIndex: number;
  /** Text after the marker in the same paragraph (when the translator merged paragraphs). */
  trailingText: string;
}

export function parseLineMarker(text: string): ParsedLineMarker | null {
  const match = lineMarkerPattern.exec(text.trim());

  if (!match) {
    return null;
  }

  return {
    paragraphId: Number(match[1]),
    lineIndex: Number(match[2]),
    trailingText: match[3].trim(),
  };
}

function repeat(pattern: string, count: number): string {
  return Array.from({ length: count }, () => pattern).join('\\s*');
}
