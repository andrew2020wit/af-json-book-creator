import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { IBookJson } from '../../../models/book-json.interface';
import {
  BookFilesService,
  createTranslationImportNotice,
  getFileErrorMessage,
  TranslationDocx,
} from '../../core/book-files/book-files.service';
import { BookStore } from '../../core/book-store/book-store';
import { parseTranslation } from '../../shared/translation-docx/parse-translation';
import { FileError, FileErrors } from '../../shared/ui/file-errors';
import { FilePickerButton } from '../../shared/ui/file-picker-button';

interface SelectedFile<T> {
  fileName: string;
  content: T;
}

type IdCheck = 'match' | 'mismatch' | null;

/** Exports `.to-translate.docx` for a JSON book and imports a translated one (spec 4.7). */
@Component({
  selector: 'app-translation-page',
  imports: [FileErrors, FilePickerButton, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './translation-page.html',
  styleUrl: './translation-page.scss',
})
export class TranslationPage {
  private readonly bookFilesService = inject(BookFilesService);
  private readonly bookStore = inject(BookStore);
  private readonly router = inject(Router);

  protected readonly selectedBook = signal<SelectedFile<IBookJson> | null>(null);
  protected readonly bookFileErrors = signal<FileError[]>([]);
  protected readonly selectedDocx = signal<SelectedFile<TranslationDocx> | null>(null);
  protected readonly docxFileErrors = signal<FileError[]>([]);
  protected readonly isReading = signal(false);
  protected readonly isExporting = signal(false);

  protected readonly idCheck = computed<IdCheck>(() => {
    const selectedBook = this.selectedBook();
    const selectedDocx = this.selectedDocx();

    if (!selectedBook || !selectedDocx) {
      return null;
    }

    return selectedBook.content.book.id.trim() === selectedDocx.content.bookId.trim()
      ? 'match'
      : 'mismatch';
  });

  protected async selectBookFile(files: File[]): Promise<void> {
    const file = files[0];

    this.selectedBook.set(null);
    this.bookFileErrors.set([]);
    this.isReading.set(true);

    try {
      const parseResult = await this.bookFilesService.readBookJsonFile(file);

      if (parseResult.isValid) {
        this.selectedBook.set({ fileName: file.name, content: parseResult.bookJson });
      } else {
        this.bookFileErrors.set([{ fileName: file.name, messages: parseResult.errors }]);
      }
    } catch (error) {
      this.bookFileErrors.set([{ fileName: file.name, messages: [getFileErrorMessage(error)] }]);
    } finally {
      this.isReading.set(false);
    }
  }

  protected async selectDocxFile(files: File[]): Promise<void> {
    const file = files[0];

    this.selectedDocx.set(null);
    this.docxFileErrors.set([]);
    this.isReading.set(true);

    try {
      const translationDocx = await this.bookFilesService.readTranslationDocxFile(file);

      this.selectedDocx.set({ fileName: file.name, content: translationDocx });
    } catch (error) {
      this.docxFileErrors.set([{ fileName: file.name, messages: [getFileErrorMessage(error)] }]);
    } finally {
      this.isReading.set(false);
    }
  }

  /** Replaces the book's translation and opens the book in the editor. */
  protected async importTranslation(): Promise<void> {
    const selectedBook = this.selectedBook();
    const selectedDocx = this.selectedDocx();

    if (!selectedBook || !selectedDocx || this.idCheck() !== 'match') {
      return;
    }

    const bookJson = selectedBook.content;
    const translationParseResult = parseTranslation(selectedDocx.content.paragraphs, bookJson.book);

    this.bookStore.open({
      bookJson: {
        ...bookJson,
        book: { ...bookJson.book, translation: translationParseResult.translation },
      },
      fileName: selectedBook.fileName,
      isSaved: false,
      notice: createTranslationImportNotice(translationParseResult),
    });
    await this.router.navigateByUrl('/editor');
  }

  /** Downloads `.to-translate.docx` for the selected book (spec 4.7). */
  protected async exportTranslationFile(): Promise<void> {
    const selectedBook = this.selectedBook();

    if (!selectedBook) {
      return;
    }

    this.isExporting.set(true);

    try {
      await this.bookFilesService.downloadTranslationDocx(
        selectedBook.content.book,
        selectedBook.fileName,
      );
    } catch (error) {
      this.bookFileErrors.set([
        { fileName: selectedBook.fileName, messages: [getFileErrorMessage(error)] },
      ]);
    } finally {
      this.isExporting.set(false);
    }
  }
}
