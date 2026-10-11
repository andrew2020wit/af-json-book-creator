import { IBookParagraph } from '../../../models/book.interface';
import { textSplitSeparators } from './text-split-separators.const';

/**
 * Splits plain text into book paragraphs: one non-empty source line is one paragraph,
 * and each paragraph is split into lines by `textSplitSeparators`.
 * Paragraph ids are sequential, starting from `firstParagraphId`.
 */
export function splitTextToParagraphs(text: string, firstParagraphId = 0): IBookParagraph[] {
  const paragraphs: IBookParagraph[] = [];

  // Windows (\r\n), Unix (\n) and classic Mac (\r) line breaks.
  for (const sourceLine of text.split(/\r\n|\r|\n/)) {
    const lines = splitParagraphToLines(sourceLine);

    if (lines.length === 0) {
      continue;
    }

    paragraphs.push({ id: firstParagraphId + paragraphs.length, text: lines });
  }

  return paragraphs;
}

export function splitParagraphToLines(paragraph: string): string[] {
  let text = paragraph;

  for (const separator of textSplitSeparators) {
    text = text.replaceAll(separator, separator + '\n');
  }

  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
