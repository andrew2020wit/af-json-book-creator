import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { BookFilesService, getFileErrorMessage } from '../../core/book-files/book-files.service';
import { BookStore } from '../../core/book-store/book-store';
import {
  createConvertedBookFileName,
  createTranslationDocxFileName,
} from '../../shared/book-json/file-names';
import { subtitleFileExtensions } from '../../shared/subtitles/parse-subtitles';
import { SubtitleItem } from '../../shared/subtitles/subtitle-item.interface';
import { FileError, FileErrors } from '../../shared/ui/file-errors';
import { FilePickerButton } from '../../shared/ui/file-picker-button';

interface SelectedSubtitles {
  fileName: string;
  subtitles: SubtitleItem[];
}

type SubtitlesRole = 'original' | 'translation';

/** Creates a JSON Book from original subtitles and, optionally, their translation (spec 4.11). */
@Component({
  selector: 'app-subtitles-page',
  imports: [
    FileErrors,
    FilePickerButton,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: './subtitles-page.html',
  styleUrl: './subtitles-page.scss',
})
export class SubtitlesPage {
  private readonly bookFilesService = inject(BookFilesService);
  private readonly bookStore = inject(BookStore);
  private readonly router = inject(Router);

  protected readonly accept = subtitleFileExtensions.join(',');
  protected readonly formatList = subtitleFileExtensions.join(', ');

  protected readonly original = signal<SelectedSubtitles | null>(null);
  protected readonly originalFileErrors = signal<FileError[]>([]);
  protected readonly translation = signal<SelectedSubtitles | null>(null);
  protected readonly translationFileErrors = signal<FileError[]>([]);
  protected readonly createErrors = signal<FileError[]>([]);
  protected readonly isBusy = signal(false);

  protected selectOriginalFile(files: File[]): Promise<void> {
    return this.selectFile(files[0], 'original');
  }

  protected selectTranslationFile(files: File[]): Promise<void> {
    return this.selectFile(files[0], 'translation');
  }

  protected removeTranslation(): void {
    this.translation.set(null);
    this.translationFileErrors.set([]);
  }

  /** Creates the book and opens it in the editor. */
  protected async createBook(): Promise<void> {
    const original = this.original();
    const translation = this.translation();

    if (!original) {
      return;
    }

    this.createErrors.set([]);
    this.isBusy.set(true);

    try {
      const bookJson = this.bookFilesService.createBookFromSubtitles(
        original.fileName,
        original.subtitles,
        translation?.subtitles ?? [],
      );
      const bookFileName = createConvertedBookFileName(original.fileName);
      let notice: string;

      if (translation) {
        const translatedLineCount = Object.keys(bookJson.book.translation ?? {}).length;

        notice =
          `Translation from ${translation.fileName}: ${translatedLineCount} of ` +
          `${bookJson.book.content.length} lines have a translation.`;
      } else {
        // Without translation subtitles the book is translated through DOCX, as after a file import.
        await this.bookFilesService.downloadTranslationDocx(bookJson.book, bookFileName);
        notice = `The translation file ${createTranslationDocxFileName(bookFileName)} has been downloaded.`;
      }

      this.bookStore.open({ bookJson, fileName: bookFileName, isSaved: false, notice });
      await this.router.navigateByUrl('/editor');
    } catch (error) {
      this.createErrors.set([
        { fileName: original.fileName, messages: [getFileErrorMessage(error)] },
      ]);
    } finally {
      this.isBusy.set(false);
    }
  }

  private async selectFile(file: File, role: SubtitlesRole): Promise<void> {
    const selected = role === 'original' ? this.original : this.translation;
    const fileErrors = role === 'original' ? this.originalFileErrors : this.translationFileErrors;

    selected.set(null);
    fileErrors.set([]);
    this.createErrors.set([]);
    this.isBusy.set(true);

    try {
      const subtitles = await this.bookFilesService.readSubtitleFile(file);

      selected.set({ fileName: file.name, subtitles });
    } catch (error) {
      fileErrors.set([{ fileName: file.name, messages: [getFileErrorMessage(error)] }]);
    } finally {
      this.isBusy.set(false);
    }
  }
}
