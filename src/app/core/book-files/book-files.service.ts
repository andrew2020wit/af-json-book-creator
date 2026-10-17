import { DOCUMENT, inject, Service } from '@angular/core';
import { IBookJson } from '../../../models/book-json.interface';
import { IBook } from '../../../models/book.interface';
import { ZipArchiveError } from '../../shared/archive/zip-archive';
import { createTranslationDocxFileName, getFileExtension } from '../../shared/book-json/file-names';
import { BookJsonParseResult, parseBookJson } from '../../shared/book-json/parse-book-json';
import { serializeBookJson } from '../../shared/book-json/serialize-book-json';
import { decodeText, TextDecodingError } from '../../shared/conversion/decode-text';
import { convertEpubToBook, EpubConversionError } from '../../shared/conversion/epub-to-book';
import { convertTxtToBook } from '../../shared/conversion/txt-to-book';
import { downloadFile } from '../../shared/download/download-file';
import {
  isSubtitleFileName,
  parseSubtitles,
  subtitleFileExtensions,
  SubtitleParseError,
} from '../../shared/subtitles/parse-subtitles';
import { SubtitleItem } from '../../shared/subtitles/subtitle-item.interface';
import { convertSubtitlesToBook } from '../../shared/subtitles/subtitles-to-book';
import { createTranslationDocx } from '../../shared/translation-docx/create-translation-docx';
import {
  readTranslationBookId,
  TranslationParseResult,
} from '../../shared/translation-docx/parse-translation';
import { readDocxParagraphs } from '../../shared/translation-docx/read-docx-paragraphs';

export interface TranslationDocx {
  /** Book id from the first paragraph of the document. */
  bookId: string;
  paragraphs: string[];
}

export class UnsupportedFileError extends Error {
  override readonly name = 'UnsupportedFileError';
}

/** Reading, converting and saving book files in the browser. */
@Service()
export class BookFilesService {
  private readonly document = inject(DOCUMENT);
  private lastBookId = 0;

  /** Converts a `.txt` or `.epub` file into a JSON Book. */
  async convertSourceFile(file: File): Promise<IBookJson> {
    const extension = getFileExtension(file.name);
    const bytes = new Uint8Array(await file.arrayBuffer());

    if (extension === '.txt') {
      return convertTxtToBook(file.name, bytes, this.createBookId());
    }

    if (extension === '.epub') {
      return convertEpubToBook(file.name, bytes, this.createBookId());
    }

    throw new UnsupportedFileError('Only .txt and .epub files can be imported.');
  }

  /** Reads a subtitle file in any supported format and encoding. */
  async readSubtitleFile(file: File): Promise<SubtitleItem[]> {
    if (!isSubtitleFileName(file.name)) {
      throw new UnsupportedFileError(
        `Only subtitle files can be imported: ${subtitleFileExtensions.join(', ')}.`,
      );
    }

    const text = await decodeText(new Uint8Array(await file.arrayBuffer()));

    return parseSubtitles(file.name, text);
  }

  /** Creates a JSON Book from original subtitles and, optionally, their translation. */
  createBookFromSubtitles(
    originalFileName: string,
    originalSubtitles: readonly SubtitleItem[],
    translationSubtitles: readonly SubtitleItem[],
  ): IBookJson {
    return convertSubtitlesToBook(
      originalFileName,
      originalSubtitles,
      translationSubtitles,
      this.createBookId(),
    );
  }

  async readBookJsonFile(file: File): Promise<BookJsonParseResult> {
    if (getFileExtension(file.name) !== '.json') {
      return { isValid: false, errors: ['Only .json files can be opened.'] };
    }

    return parseBookJson(await file.text());
  }

  /** Reads a translated `.to-translate.docx` (spec 4.7). */
  async readTranslationDocxFile(file: File): Promise<TranslationDocx> {
    if (getFileExtension(file.name) !== '.docx') {
      throw new UnsupportedFileError('Only .docx files can be imported as a translation.');
    }

    const paragraphs = await readDocxParagraphs(new Uint8Array(await file.arrayBuffer()));
    const bookId = readTranslationBookId(paragraphs);

    if (bookId === null) {
      throw new UnsupportedFileError(
        'The document does not start with a book ID like [[[[1700000000000]]]]. ' +
          'Use a translated .to-translate.docx file.',
      );
    }

    return { bookId, paragraphs };
  }

  /** Downloads `<name>.book.json` (spec 4.5). */
  downloadBookJson(bookJson: IBookJson, bookFileName: string): void {
    downloadFile(
      this.document,
      new Blob([serializeBookJson(bookJson)], { type: 'application/json' }),
      bookFileName,
    );
  }

  /** Downloads `<name>.to-translate.docx` for a book saved as `bookFileName` (spec 4.7). */
  async downloadTranslationDocx(book: IBook, bookFileName: string): Promise<void> {
    downloadFile(
      this.document,
      await createTranslationDocx(book),
      createTranslationDocxFileName(bookFileName),
    );
  }

  /**
   * Book ids are the current time in milliseconds. Books converted in the same millisecond
   * (batch mode) still get different ids.
   */
  private createBookId(): number {
    this.lastBookId = Math.max(Date.now(), this.lastBookId + 1);

    return this.lastBookId;
  }
}

/** The summary shown after a translation import (spec 4.7). */
export function createTranslationImportNotice(
  translationParseResult: TranslationParseResult,
): string {
  const { translatedLineCount, totalLineCount, skippedMarkerCount } = translationParseResult;
  const parts = [
    `Translation imported: ${translatedLineCount} of ${totalLineCount} lines have a translation.`,
  ];

  if (skippedMarkerCount > 0) {
    parts.push(
      `${skippedMarkerCount} markers point to lines that the book does not have and were skipped.`,
    );
  }

  parts.push('Save the book to download it with the translation.');

  return parts.join(' ');
}

/** A message for the user about a failed conversion or file read. */
export function getFileErrorMessage(error: unknown): string {
  if (
    error instanceof UnsupportedFileError ||
    error instanceof TextDecodingError ||
    error instanceof EpubConversionError ||
    error instanceof SubtitleParseError
  ) {
    return error.message;
  }

  if (error instanceof ZipArchiveError) {
    return 'The file is damaged or has an unexpected format.';
  }

  return 'The file could not be read.';
}
