import { IBookJson } from '../../../models/book-json.interface';
import { serializeBookJson } from './serialize-book-json';

describe('serializeBookJson', () => {
  it('sets the content description, sorts headers, keeps legacy fields and indents by 2', () => {
    const bookJson = {
      jsonContentDescription: 'JSON Book',
      book: {
        id: '1',
        title: 'Title',
        description: 'legacy',
        content: [
          { id: 0, text: ['a'] },
          { id: 1, text: ['b'] },
        ],
        markedItems: [],
        headers: [
          { id: 1, text: 'Second', isMarked: true },
          { id: 0, text: 'First' },
        ],
      },
    } as IBookJson;

    const text = serializeBookJson(bookJson);

    expect(JSON.parse(text)).toEqual({
      jsonContentDescription: 'ForeignReaderBook',
      book: {
        id: '1',
        title: 'Title',
        description: 'legacy',
        content: [
          { id: 0, text: ['a'] },
          { id: 1, text: ['b'] },
        ],
        markedItems: [],
        headers: [
          { id: 0, text: 'First' },
          { id: 1, text: 'Second', isMarked: true },
        ],
      },
    });
    expect(text.startsWith('{\n  "jsonContentDescription"')).toBe(true);
    expect(bookJson.book.headers[0].text).toBe('Second');
  });
});
