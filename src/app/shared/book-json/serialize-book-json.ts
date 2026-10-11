import { IBookJson } from '../../../models/book-json.interface';
import { foreignReaderJsonContentDescription } from './book-json.const';
import { sortHeadersByParagraphId } from './headers';

/**
 * Serializes a book for saving (spec 4.5): 2-space indent, `jsonContentDescription` set to
 * `ForeignReaderBook`, headers sorted by paragraph id. Fields that are not in the model are kept.
 */
export function serializeBookJson(bookJson: IBookJson): string {
  const outputBookJson: IBookJson = {
    ...bookJson,
    jsonContentDescription: foreignReaderJsonContentDescription,
    book: {
      ...bookJson.book,
      headers: sortHeadersByParagraphId(bookJson.book.headers, (header) => header.id),
    },
  };

  return JSON.stringify(outputBookJson, null, 2);
}
