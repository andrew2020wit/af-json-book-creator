export const bookJsonExtension = '.book.json';
export const translationDocxExtension = '.to-translate.docx';

/** Port of `normalizeFileName` from `json-book-utils`. */
export function normalizeFileName(name: string): string {
  return name
    .toLowerCase()
    .replaceAll('  ', '-')
    .replaceAll('\t', '-')
    .replaceAll(' ', '-')
    .replaceAll(',', '')
    .replaceAll('!', '')
    .replaceAll('?', '')
    .replaceAll('"', '')
    .replaceAll('`', '')
    .replaceAll(`'`, '')
    .replaceAll(':', '-')
    .replaceAll('.', '')
    .replaceAll('---', '-')
    .replaceAll('--', '-');
}

export function getFileNameWithoutExtension(fileName: string): string {
  const dotIndex = fileName.lastIndexOf('.');

  return dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
}

export function getFileExtension(fileName: string): string {
  const dotIndex = fileName.lastIndexOf('.');

  return dotIndex > 0 ? fileName.slice(dotIndex).toLowerCase() : '';
}

/** `My Book.epub` → `my-book.book.json` */
export function createConvertedBookFileName(sourceFileName: string): string {
  return normalizeFileName(getFileNameWithoutExtension(sourceFileName)) + bookJsonExtension;
}

/** `my-book.book.json` or `my-book.json` → `my-book.to-translate.docx` */
export function createTranslationDocxFileName(bookFileName: string): string {
  const lowerCaseName = bookFileName.toLowerCase();

  if (lowerCaseName.endsWith(bookJsonExtension)) {
    return bookFileName.slice(0, -bookJsonExtension.length) + translationDocxExtension;
  }

  if (lowerCaseName.endsWith('.json')) {
    return bookFileName.slice(0, -'.json'.length) + translationDocxExtension;
  }

  return bookFileName + translationDocxExtension;
}
