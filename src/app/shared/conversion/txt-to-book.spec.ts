import { encodeWindows1251 } from '../../../testing/legacy-encodings';
import { convertTxtToBook } from './txt-to-book';

describe('convertTxtToBook', () => {
  it('creates a book with the file name as the title and the time as the id', async () => {
    const bytes = new TextEncoder().encode('It was cold. He left.\n\nThe end');

    expect(await convertTxtToBook('My Story.txt', bytes, 1700000000000)).toEqual({
      jsonContentDescription: 'ForeignReaderBook',
      book: {
        id: '1700000000000',
        title: 'My Story',
        content: [
          { id: 0, text: ['It was cold.', 'He left.'] },
          { id: 1, text: ['The end'] },
        ],
        markedItems: [],
        headers: [],
      },
    });
  });

  it('decodes a non-UTF-8 file', async () => {
    const text =
      'Это был холодный зимний вечер. Старик медленно шёл по пустой улице, ' +
      'и снег тихо падал на его плечи. Он думал о своём доме и о книгах.';

    const bookJson = await convertTxtToBook('book.txt', encodeWindows1251(text), 1);

    expect(bookJson.book.content[0].text[0]).toBe('Это был холодный зимний вечер.');
  });
});
