import { Service, signal } from '@angular/core';
import { IBookJson } from '../../../models/book-json.interface';

export interface OpenBook {
  bookJson: IBookJson;
  /** Name of the `.book.json` file used on Save. */
  fileName: string;
  /**
   * `false` for a book that exists only in memory: just converted from TXT/EPUB or with a freshly
   * imported translation (spec 4.10). Changes made on the editor page are tracked by the page.
   */
  isSaved: boolean;
  /** A message the editor page shows when it opens, e.g. the translation import summary. */
  notice?: string;
}

/** The single open book (spec 4.8). It lives in memory only. */
@Service()
export class BookStore {
  private readonly openBookState = signal<OpenBook | null>(null);

  readonly openBook = this.openBookState.asReadonly();

  open(openBook: OpenBook): void {
    this.openBookState.set(openBook);
  }

  markSaved(bookJson: IBookJson): void {
    this.openBookState.update((openBook) =>
      openBook ? { ...openBook, bookJson, isSaved: true } : openBook,
    );
  }

  close(): void {
    this.openBookState.set(null);
  }
}
