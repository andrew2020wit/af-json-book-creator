import { IBookJson } from '../../../models/book-json.interface';

export type BookJsonParseResult =
  { isValid: true; bookJson: IBookJson } | { isValid: false; errors: string[] };

/** Stop collecting per-item errors after this many, a broken file can have thousands. */
const maxItemErrorCount = 5;

/**
 * Parses and validates a JSON Book file (spec 4.6).
 * Fields that are not in the model are kept as they are.
 * Missing `headers` and `markedItems` become empty arrays.
 */
export function parseBookJson(text: string): BookJsonParseResult {
  let root: unknown;

  try {
    root = JSON.parse(text);
  } catch {
    return { isValid: false, errors: ['The file is not valid JSON.'] };
  }

  if (!isRecord(root) || !isRecord(root['book'])) {
    return { isValid: false, errors: ['The file has no "book" object.'] };
  }

  const book = root['book'];
  const errors: string[] = [];

  if (typeof book['id'] !== 'string') {
    errors.push('"book.id" must be a string.');
  }

  if (typeof book['title'] !== 'string') {
    errors.push('"book.title" must be a string.');
  }

  errors.push(...validateContent(book['content']));

  if (book['headers'] !== undefined) {
    errors.push(...validateHeaders(book['headers']));
  }

  if (book['markedItems'] !== undefined && !isNumberArray(book['markedItems'])) {
    errors.push('"book.markedItems" must be an array of numbers.');
  }

  if (book['translation'] !== undefined && !isStringRecord(book['translation'])) {
    errors.push('"book.translation" must be an object with string values.');
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  const bookJson = {
    ...root,
    book: {
      ...book,
      headers: book['headers'] ?? [],
      markedItems: book['markedItems'] ?? [],
    },
  } as unknown as IBookJson;

  return { isValid: true, bookJson };
}

function validateContent(content: unknown): string[] {
  if (!Array.isArray(content)) {
    return ['"book.content" must be an array of paragraphs.'];
  }

  const errors: string[] = [];
  const paragraphIds = new Set<number>();

  for (const [index, paragraph] of content.entries()) {
    if (errors.length >= maxItemErrorCount) {
      break;
    }

    if (!isRecord(paragraph) || typeof paragraph['id'] !== 'number') {
      errors.push(`Paragraph #${index + 1}: "id" must be a number.`);

      continue;
    }

    if (!isStringArray(paragraph['text'])) {
      errors.push(`Paragraph #${index + 1}: "text" must be an array of strings.`);
    }

    if (paragraphIds.has(paragraph['id'])) {
      errors.push(`Paragraph id ${paragraph['id']} is used more than once.`);
    }

    paragraphIds.add(paragraph['id']);
  }

  return errors;
}

function validateHeaders(headers: unknown): string[] {
  if (!Array.isArray(headers)) {
    return ['"book.headers" must be an array.'];
  }

  const errors: string[] = [];

  for (const [index, header] of headers.entries()) {
    if (errors.length >= maxItemErrorCount) {
      break;
    }

    if (
      !isRecord(header) ||
      typeof header['id'] !== 'number' ||
      typeof header['text'] !== 'string'
    ) {
      errors.push(`Header #${index + 1} must have a number "id" and a string "text".`);
    }
  }

  return errors;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'number');
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return isRecord(value) && Object.values(value).every((item) => typeof item === 'string');
}
