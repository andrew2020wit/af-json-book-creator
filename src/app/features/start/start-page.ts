import { Component, computed, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { BookFilesService, getFileErrorMessage } from '../../core/book-files/book-files.service';
import { BookStore } from '../../core/book-store/book-store';
import {
  createConvertedBookFileName,
  createTranslationDocxFileName,
} from '../../shared/book-json/file-names';
import { FileError, FileErrors } from '../../shared/ui/file-errors';
import { FilePickerButton } from '../../shared/ui/file-picker-button';

interface BatchProgress {
  totalCount: number;
  doneCount: number;
  currentFileName: string;
}

interface BatchResult {
  totalCount: number;
  convertedCount: number;
}

@Component({
  selector: 'app-start-page',
  imports: [FileErrors, FilePickerButton, MatCardModule, MatProgressBarModule],
  templateUrl: './start-page.html',
  styleUrl: './start-page.scss',
})
export class StartPage {
  private readonly bookFilesService = inject(BookFilesService);
  private readonly bookStore = inject(BookStore);
  private readonly router = inject(Router);

  protected readonly isBusy = signal(false);
  protected readonly batchProgress = signal<BatchProgress | null>(null);
  protected readonly batchResult = signal<BatchResult | null>(null);
  protected readonly fileErrors = signal<FileError[]>([]);

  protected readonly fileErrorsTitle = computed(() =>
    this.fileErrors().length > 1
      ? 'These files could not be processed'
      : 'The file could not be processed',
  );

  protected readonly batchProgressPercent = computed(() => {
    const batchProgress = this.batchProgress();

    return batchProgress ? (batchProgress.doneCount / batchProgress.totalCount) * 100 : 0;
  });

  protected async importFiles(files: File[]): Promise<void> {
    this.resetStatus();
    this.isBusy.set(true);

    try {
      if (files.length === 1) {
        await this.importSingleFile(files[0]);
      } else {
        await this.importBatch(files);
      }
    } finally {
      this.isBusy.set(false);
    }
  }

  protected async editJsonFile(files: File[]): Promise<void> {
    const file = files[0];

    this.resetStatus();
    this.isBusy.set(true);

    try {
      const parseResult = await this.bookFilesService.readBookJsonFile(file);

      if (!parseResult.isValid) {
        this.fileErrors.set([{ fileName: file.name, messages: parseResult.errors }]);

        return;
      }

      this.bookStore.open({ bookJson: parseResult.bookJson, fileName: file.name, isSaved: true });
      await this.router.navigateByUrl('/editor');
    } catch (error) {
      this.fileErrors.set([{ fileName: file.name, messages: [getFileErrorMessage(error)] }]);
    } finally {
      this.isBusy.set(false);
    }
  }

  private async importSingleFile(file: File): Promise<void> {
    try {
      const bookJson = await this.bookFilesService.convertSourceFile(file);
      const bookFileName = createConvertedBookFileName(file.name);

      // The translation file is downloaded on import, not on Save (spec 4.1).
      await this.bookFilesService.downloadTranslationDocx(bookJson.book, bookFileName);
      this.bookStore.open({
        bookJson,
        fileName: bookFileName,
        isSaved: false,
        notice: `The translation file ${createTranslationDocxFileName(bookFileName)} has been downloaded.`,
      });
      await this.router.navigateByUrl('/editor');
    } catch (error) {
      this.fileErrors.set([{ fileName: file.name, messages: [getFileErrorMessage(error)] }]);
    }
  }

  /** Converts the files one by one and downloads the result of each (spec 4.1). */
  private async importBatch(files: File[]): Promise<void> {
    const fileErrors: FileError[] = [];
    let convertedCount = 0;

    for (const [index, file] of files.entries()) {
      this.batchProgress.set({
        totalCount: files.length,
        doneCount: index,
        currentFileName: file.name,
      });

      try {
        const bookJson = await this.bookFilesService.convertSourceFile(file);

        const bookFileName = createConvertedBookFileName(file.name);

        this.bookFilesService.downloadBookJson(bookJson, bookFileName);
        await this.bookFilesService.downloadTranslationDocx(bookJson.book, bookFileName);
        convertedCount++;
      } catch (error) {
        fileErrors.push({ fileName: file.name, messages: [getFileErrorMessage(error)] });
      }
    }

    this.batchProgress.set(null);
    this.batchResult.set({ totalCount: files.length, convertedCount });
    this.fileErrors.set(fileErrors);
  }

  private resetStatus(): void {
    this.batchProgress.set(null);
    this.batchResult.set(null);
    this.fileErrors.set([]);
  }
}
