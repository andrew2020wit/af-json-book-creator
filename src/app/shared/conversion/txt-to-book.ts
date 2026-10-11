import { IBookJson } from '../../../models/book-json.interface';
import { foreignReaderJsonContentDescription } from '../book-json/book-json.const';
import { getFileNameWithoutExtension } from '../book-json/file-names';
import { decodeText } from './decode-text';
import { splitTextToParagraphs } from './split-text';

/** Converts a TXT file into a JSON Book. `now` becomes the book id. */
export async function convertTxtToBook(
  fileName: string,
  bytes: Uint8Array,
  now: number,
): Promise<IBookJson> {
  const text = await decodeText(bytes);

  return {
    jsonContentDescription: foreignReaderJsonContentDescription,
    book: {
      id: String(now),
      title: getFileNameWithoutExtension(fileName),
      content: splitTextToParagraphs(text),
      markedItems: [],
      headers: [],
    },
  };
}
