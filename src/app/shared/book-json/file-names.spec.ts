import {
  createConvertedBookFileName,
  createTranslationDocxFileName,
  getFileExtension,
  getFileNameWithoutExtension,
  normalizeFileName,
} from './file-names';

describe('file names', () => {
  it('normalizes a file name like json-book-utils', () => {
    expect(normalizeFileName("Tom's Book: Part 1, Vol. 2!")).toBe('toms-book-part-1-vol-2');
  });

  it('removes only the last extension', () => {
    expect(getFileNameWithoutExtension('my.book.json')).toBe('my.book');
    expect(getFileNameWithoutExtension('README')).toBe('README');
    expect(getFileNameWithoutExtension('.hidden')).toBe('.hidden');
  });

  it('returns the lower-case extension with the dot', () => {
    expect(getFileExtension('Book.EPUB')).toBe('.epub');
    expect(getFileExtension('README')).toBe('');
  });

  it('creates a book file name from a source file name', () => {
    expect(createConvertedBookFileName('My Book.epub')).toBe('my-book.book.json');
  });

  it('creates a translation file name from a book file name', () => {
    expect(createTranslationDocxFileName('my-book.book.json')).toBe('my-book.to-translate.docx');
    expect(createTranslationDocxFileName('My Book.JSON')).toBe('My Book.to-translate.docx');
    expect(createTranslationDocxFileName('book')).toBe('book.to-translate.docx');
  });
});
