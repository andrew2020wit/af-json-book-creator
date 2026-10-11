import { parseBookJson } from './parse-book-json';

function parseErrors(value: unknown): string[] {
  const result = parseBookJson(JSON.stringify(value));

  return result.isValid ? [] : result.errors;
}

describe('parseBookJson', () => {
  it('accepts a valid book and keeps legacy fields', () => {
    const text = JSON.stringify({
      jsonContentDescription: 'JSON Book',
      book: {
        id: '1',
        title: 'Title',
        description: 'Old description',
        content: [{ id: 0, text: ['Line'] }],
        headers: [{ id: 0, text: 'Start', isMarked: true }],
        markedItems: [0],
        translation: { '0-0': 'Строка' },
      },
    });

    const result = parseBookJson(text);

    expect(result).toEqual({ isValid: true, bookJson: JSON.parse(text) });
  });

  it('fills missing headers and markedItems with empty arrays', () => {
    const result = parseBookJson(
      JSON.stringify({ book: { id: '1', title: '', content: [{ id: 3, text: [] }] } }),
    );

    expect(result.isValid && result.bookJson.book.headers).toEqual([]);
    expect(result.isValid && result.bookJson.book.markedItems).toEqual([]);
  });

  it('rejects text that is not JSON', () => {
    expect(parseBookJson('{ nope')).toEqual({
      isValid: false,
      errors: ['The file is not valid JSON.'],
    });
  });

  it('rejects a file without a book object', () => {
    expect(parseErrors({ content: [] })).toEqual(['The file has no "book" object.']);
    expect(parseErrors([1, 2])).toEqual(['The file has no "book" object.']);
  });

  it('reports wrong field types', () => {
    expect(
      parseErrors({
        book: { id: 1, title: null, content: {}, headers: {}, markedItems: ['a'], translation: [] },
      }),
    ).toEqual([
      '"book.id" must be a string.',
      '"book.title" must be a string.',
      '"book.content" must be an array of paragraphs.',
      '"book.headers" must be an array.',
      '"book.markedItems" must be an array of numbers.',
      '"book.translation" must be an object with string values.',
    ]);
  });

  it('reports invalid paragraphs and headers', () => {
    expect(
      parseErrors({
        book: {
          id: '1',
          title: 't',
          content: [
            { id: 'x', text: [] },
            { id: 1, text: [2] },
            { id: 1, text: [] },
          ],
          headers: [{ id: 1 }],
        },
      }),
    ).toEqual([
      'Paragraph #1: "id" must be a number.',
      'Paragraph #2: "text" must be an array of strings.',
      'Paragraph id 1 is used more than once.',
      'Header #1 must have a number "id" and a string "text".',
    ]);
  });

  it('limits the number of per-item errors', () => {
    const content = Array.from({ length: 100 }, () => ({ id: 'bad', text: [] }));

    expect(parseErrors({ book: { id: '1', title: 't', content } })).toHaveLength(5);
  });
});
