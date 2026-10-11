import { IBook } from '../../../models/book.interface';
import { parseBookIdMarker, parseLineMarker } from './translation-markers';

export interface TranslationParseResult {
  translation: Record<string, string>;
  /** All lines of the book. */
  totalLineCount: number;
  /** Lines that received a translation. */
  translatedLineCount: number;
  /** Markers that point to a line the book does not have. */
  skippedMarkerCount: number;
}

/** The book id from the first non-empty paragraph of a translated DOCX, or `null`. */
export function readTranslationBookId(docxParagraphs: readonly string[]): string | null {
  const firstParagraph = docxParagraphs.find((paragraph) => paragraph.trim());

  return firstParagraph === undefined ? null : parseBookIdMarker(firstParagraph);
}

/**
 * Builds `book.translation` from the paragraphs of a translated DOCX (spec 4.7),
 * like `import-translation` from `json-book-utils`: a line marker is followed by a paragraph
 * with the translation of that line.
 */
export function parseTranslation(
  docxParagraphs: readonly string[],
  book: IBook,
): TranslationParseResult {
  const bookLineKeys = new Set<string>();

  for (const paragraph of book.content) {
    for (let i = 0; i < paragraph.text.length; i++) {
      bookLineKeys.add(createTranslationKey(paragraph.id, i));
    }
  }

  const translation: Record<string, string> = {};
  let skippedMarkerCount = 0;
  let pendingKey: string | null = null;
  const firstParagraphIndex = docxParagraphs.findIndex((paragraph) => paragraph.trim());

  for (const docxParagraph of docxParagraphs.slice(firstParagraphIndex + 1)) {
    const lineMarker = parseLineMarker(docxParagraph);

    if (lineMarker) {
      const key = createTranslationKey(lineMarker.paragraphId, lineMarker.lineIndex);

      pendingKey = null;

      if (!bookLineKeys.has(key)) {
        skippedMarkerCount++;
      } else if (lineMarker.trailingText) {
        translation[key] = lineMarker.trailingText;
      } else {
        pendingKey = key;
      }

      continue;
    }

    if (pendingKey === null) {
      continue;
    }

    const translatedText = docxParagraph.trim();

    if (translatedText) {
      translation[pendingKey] = translatedText;
    }

    pendingKey = null;
  }

  return {
    translation,
    totalLineCount: bookLineKeys.size,
    translatedLineCount: Object.keys(translation).length,
    skippedMarkerCount,
  };
}

function createTranslationKey(paragraphId: number, lineIndex: number): string {
  return `${paragraphId}-${lineIndex}`;
}
