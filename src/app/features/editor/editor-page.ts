import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { applyEach, form, FormField, validate } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { IBookJson } from '../../../models/book-json.interface';
import {
  BookFilesService,
  createTranslationImportNotice,
  getFileErrorMessage,
} from '../../core/book-files/book-files.service';
import { BookStore, OpenBook } from '../../core/book-store/book-store';
import { LeaveConfirmation } from '../../core/book-store/editor-guards';
import { ConfirmDialogService } from '../../core/confirm-dialog/confirm-dialog.service';
import {
  findDuplicateParagraphIds,
  getHeaderParagraphIdError,
  getHeaderTitleError,
  sortHeadersByParagraphId,
} from '../../shared/book-json/headers';
import { parseTranslation } from '../../shared/translation-docx/parse-translation';
import { FileError, FileErrors } from '../../shared/ui/file-errors';
import { FilePickerButton } from '../../shared/ui/file-picker-button';
import { createSavedHeader, EditorFormValue, HeaderFormValue, SourceHeader } from './editor-form';
import { HeaderRow } from './header-row';

@Component({
  selector: 'app-editor-page',
  imports: [
    FileErrors,
    FilePickerButton,
    FormField,
    HeaderRow,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  host: {
    '(window:beforeunload)': 'onBeforeUnload($event)',
  },
  templateUrl: './editor-page.html',
  styleUrl: './editor-page.scss',
})
export class EditorPage implements LeaveConfirmation {
  private readonly bookStore = inject(BookStore);
  private readonly bookFilesService = inject(BookFilesService);
  private readonly confirmDialogService = inject(ConfirmDialogService);
  private readonly liveAnnouncer = inject(LiveAnnouncer);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  /** The editor guard guarantees an open book. */
  private readonly openBook = computed(() => this.bookStore.openBook() as OpenBook);
  private readonly book = computed(() => this.openBook().bookJson.book);

  /** Headers of the opened file by row key, to keep their legacy fields on save. */
  private readonly sourceHeadersByKey = new Map<number, SourceHeader>();
  private nextHeaderKey = 0;

  protected readonly editorModel = signal<EditorFormValue>(this.createInitialFormValue());
  protected readonly markedItems = signal(this.book().markedItems);
  protected readonly translation = signal(this.book().translation);
  /** Incremented on every translation import, so that an import counts as an unsaved change. */
  private readonly translationRevision = signal(0);
  private readonly savedSnapshot = signal(this.createSnapshot());

  private readonly existingParagraphIds = computed(
    () => new Set(this.book().content.map((paragraph) => paragraph.id)),
  );

  private readonly firstLineByParagraphId = computed(
    () => new Map(this.book().content.map((paragraph) => [paragraph.id, paragraph.text[0] ?? ''])),
  );

  private readonly duplicateParagraphIds = computed(() =>
    findDuplicateParagraphIds(this.editorModel().headers.map((header) => header.paragraphId)),
  );

  protected readonly editorForm = form(this.editorModel, (path) => {
    validate(path.title, ({ value }) =>
      value().trim() ? null : { kind: 'required', message: 'Title is required.' },
    );
    applyEach(path.headers, (headerPath) => {
      validate(headerPath.paragraphId, ({ value }) => {
        const paragraphId = value();
        const message = getHeaderParagraphIdError(
          paragraphId,
          this.existingParagraphIds(),
          paragraphId !== null && this.duplicateParagraphIds().has(paragraphId),
        );

        return message ? { kind: 'paragraphId', message } : null;
      });
      validate(headerPath.title, ({ value }) => {
        const message = getHeaderTitleError(value());

        return message ? { kind: 'required', message } : null;
      });
    });
  });

  protected readonly saveError = signal<string | null>(null);

  protected readonly isDirty = computed(
    () => !this.openBook().isSaved || this.createSnapshot() !== this.savedSnapshot(),
  );

  protected readonly bookSummary = computed(() => {
    const book = this.book();
    const lineCount = book.content.reduce((count, paragraph) => count + paragraph.text.length, 0);

    return { paragraphCount: book.content.length, lineCount };
  });

  protected readonly translatedLineCount = computed(
    () => Object.keys(this.translation() ?? {}).length,
  );

  protected readonly isImportingTranslation = signal(false);
  protected readonly translationErrors = signal<FileError[]>([]);

  protected readonly fileName = computed(() => this.openBook().fileName);
  /** A message from opening the book or from the last translation import. */
  protected readonly notice = signal(this.openBook().notice ?? null);

  constructor() {
    // Show problems of the opened file (empty title, broken headers) right away.
    this.editorForm().markAsTouched();

    // Leaving the page closes the book and drops everything unsaved (spec 4.10).
    inject(DestroyRef).onDestroy(() => this.bookStore.close());
  }

  confirmLeave(): boolean | Promise<boolean> {
    if (!this.isDirty()) {
      return true;
    }

    return this.confirmDialogService.confirm({
      title: 'Leave without saving?',
      message: 'The book has unsaved changes. If you leave, they will be lost.',
      confirmLabel: 'Leave',
    });
  }

  protected onBeforeUnload(beforeUnloadEvent: BeforeUnloadEvent): void {
    if (this.isDirty()) {
      beforeUnloadEvent.preventDefault();
    }
  }

  protected getParagraphPreview(paragraphId: number | null): string | null {
    if (paragraphId === null) {
      return null;
    }

    return this.firstLineByParagraphId().get(paragraphId) ?? null;
  }

  protected addHeader(): void {
    const key = this.nextHeaderKey++;

    this.editorModel.update((formValue) => ({
      ...formValue,
      headers: [...formValue.headers, { key, paragraphId: null, title: '' }],
    }));

    this.focusAfterRender(() =>
      this.hostElement.querySelector<HTMLElement>(`[data-header-key="${key}"] .paragraph-id-input`),
    );
  }

  protected deleteHeader(key: number): void {
    const headers = this.editorModel().headers;
    const index = headers.findIndex((header) => header.key === key);
    const nextHeader = headers[index + 1] ?? headers[index - 1];

    this.sourceHeadersByKey.delete(key);
    this.editorModel.update((formValue) => ({
      ...formValue,
      headers: formValue.headers.filter((header) => header.key !== key),
    }));
    this.liveAnnouncer.announce('Header deleted.');

    this.focusAfterRender(() =>
      nextHeader
        ? this.hostElement.querySelector<HTMLElement>(
            `[data-header-key="${nextHeader.key}"] .delete-button`,
          )
        : this.hostElement.querySelector<HTMLElement>('.add-header-button'),
    );
  }

  protected async deleteAllHeaders(): Promise<void> {
    const isConfirmed = await this.confirmDialogService.confirm({
      title: 'Delete all headers?',
      message: `All ${this.editorModel().headers.length} headers will be deleted.`,
      confirmLabel: 'Delete all',
    });

    if (!isConfirmed) {
      return;
    }

    this.sourceHeadersByKey.clear();
    this.editorModel.update((formValue) => ({ ...formValue, headers: [] }));
    this.liveAnnouncer.announce('All headers deleted.');
    this.focusAfterRender(() => this.hostElement.querySelector<HTMLElement>('.add-header-button'));
  }

  protected async deleteAllBookmarks(): Promise<void> {
    const isConfirmed = await this.confirmDialogService.confirm({
      title: 'Delete all bookmarks?',
      message: `All ${this.markedItems().length} bookmarks will be deleted.`,
      confirmLabel: 'Delete all',
    });

    if (isConfirmed) {
      this.markedItems.set([]);
      this.liveAnnouncer.announce('All bookmarks deleted.');
    }
  }

  /**
   * Re-sorts the headers when the user has finished editing a Paragraph ID (blur or Enter).
   * Focus stays on the element the user moved to, even if its row moved (spec 4.5).
   */
  protected onParagraphIdCommitted(event: Event, key: number): void {
    const headers = this.editorModel().headers;
    const sortedHeaders = sortHeadersByParagraphId(headers, (header) => header.paragraphId);

    if (sortedHeaders.every((header, index) => header === headers[index])) {
      return;
    }

    const focusTarget =
      event instanceof FocusEvent ? event.relatedTarget : (event.target as EventTarget | null);
    const newPosition = sortedHeaders.findIndex((header) => header.key === key) + 1;

    this.editorModel.update((formValue) => ({ ...formValue, headers: sortedHeaders }));
    this.liveAnnouncer.announce(
      `Headers sorted. This header is now ${newPosition} of ${sortedHeaders.length}.`,
    );

    if (focusTarget instanceof HTMLElement) {
      this.focusAfterRender(() => focusTarget);
    }
  }

  /**
   * Replaces the book's translation with the one from a translated `.to-translate.docx`
   * if the book IDs match (spec 4.5, 4.7). The change is unsaved until Save.
   */
  protected async importTranslation(files: File[]): Promise<void> {
    const file = files[0];

    this.translationErrors.set([]);
    this.isImportingTranslation.set(true);

    try {
      const translationDocx = await this.bookFilesService.readTranslationDocxFile(file);

      if (translationDocx.bookId.trim() !== this.book().id.trim()) {
        this.translationErrors.set([
          { fileName: file.name, messages: ['This is a translation of a different book.'] },
        ]);

        return;
      }

      const translationParseResult = parseTranslation(translationDocx.paragraphs, this.book());
      const notice = createTranslationImportNotice(translationParseResult);

      this.translation.set(translationParseResult.translation);
      this.translationRevision.update((revision) => revision + 1);
      this.notice.set(notice);
      this.liveAnnouncer.announce(notice);
    } catch (error) {
      this.translationErrors.set([{ fileName: file.name, messages: [getFileErrorMessage(error)] }]);
    } finally {
      this.isImportingTranslation.set(false);
    }
  }

  /** Downloads the `.book.json` file only; the translation file is not saved here (spec 4.5). */
  protected save(): void {
    if (this.editorForm().invalid()) {
      return;
    }

    this.saveError.set(null);

    try {
      const bookJson = this.createBookJson();

      this.bookFilesService.downloadBookJson(bookJson, this.fileName());
      this.bookStore.markSaved(bookJson);
      this.savedSnapshot.set(this.createSnapshot());
      this.liveAnnouncer.announce('The book is saved.');
    } catch {
      this.saveError.set('The book could not be saved.');
    }
  }

  protected goBack(): void {
    void this.router.navigateByUrl('/');
  }

  private createInitialFormValue(): EditorFormValue {
    const book = this.book();
    const headers = sortHeadersByParagraphId(book.headers, (header) => header.id).map(
      (header): HeaderFormValue => {
        const key = this.nextHeaderKey++;

        this.sourceHeadersByKey.set(key, header as SourceHeader);

        return { key, paragraphId: header.id, title: header.text };
      },
    );

    return { title: book.title, headers };
  }

  private createBookJson(): IBookJson {
    const formValue = this.editorModel();
    const bookJson = this.openBook().bookJson;

    return {
      ...bookJson,
      book: {
        ...bookJson.book,
        title: formValue.title.trim(),
        markedItems: this.markedItems(),
        translation: this.translation(),
        headers: formValue.headers.map((header) =>
          createSavedHeader(header, this.sourceHeadersByKey.get(header.key)),
        ),
      },
    };
  }

  /** A comparable snapshot of everything the page can change. */
  private createSnapshot(): string {
    const formValue = this.editorModel();

    return JSON.stringify({
      title: formValue.title,
      headers: formValue.headers.map((header) => [header.key, header.paragraphId, header.title]),
      markedItems: this.markedItems(),
      translationRevision: this.translationRevision(),
    });
  }

  private focusAfterRender(findElement: () => HTMLElement | null): void {
    afterNextRender(
      {
        read: () => {
          const element = findElement();

          if (element?.isConnected && element !== element.ownerDocument.activeElement) {
            element.focus();
          }
        },
      },
      { injector: this.injector },
    );
  }
}
