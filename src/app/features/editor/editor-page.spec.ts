import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IBookJson } from '../../../models/book-json.interface';
import { BookFilesService } from '../../core/book-files/book-files.service';
import { BookStore } from '../../core/book-store/book-store';
import { createTranslationDocx } from '../../shared/translation-docx/create-translation-docx';
import { EditorPage } from './editor-page';

const bookJson = {
  jsonContentDescription: 'JSON Book',
  book: {
    id: '111',
    title: 'Book',
    description: 'legacy',
    content: [
      { id: 0, text: ['Zero'] },
      { id: 2, text: ['Two'] },
      { id: 4, text: ['Four'] },
    ],
    headers: [
      { id: 4, text: 'Last', isMarked: true },
      { id: 0, text: 'First' },
    ],
    markedItems: [2],
  },
} as IBookJson;

describe('EditorPage', () => {
  let downloadBookJson: ReturnType<typeof vi.spyOn>;

  function createEditor(isSaved: boolean) {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    downloadBookJson = vi
      .spyOn(TestBed.inject(BookFilesService), 'downloadBookJson')
      .mockImplementation(() => undefined);
    TestBed.inject(BookStore).open({ bookJson, fileName: 'book.book.json', isSaved });

    const fixture = TestBed.createComponent(EditorPage);

    fixture.detectChanges();

    return fixture;
  }

  function getTitleInput(element: HTMLElement): HTMLInputElement {
    return element.querySelector<HTMLInputElement>('.book-title-field input')!;
  }

  it('shows headers sorted by paragraph id', () => {
    const fixture = createEditor(true);
    const headerTitles = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>(
        'app-header-row .title-field input',
      ),
      (input) => input.value,
    );

    expect(headerTitles).toEqual(['First', 'Last']);
  });

  it('is clean for an opened file and dirty after a change', async () => {
    const fixture = createEditor(true);
    const editorPage = fixture.componentInstance;

    expect(await editorPage.confirmLeave()).toBe(true);

    const titleInput = getTitleInput(fixture.nativeElement);

    titleInput.value = 'New title';
    titleInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(editorPage.confirmLeave()).toBeInstanceOf(Promise);
  });

  it('treats a converted book as unsaved', () => {
    const fixture = createEditor(false);

    expect(fixture.componentInstance.confirmLeave()).toBeInstanceOf(Promise);
  });

  it('saves the edited book and keeps legacy fields', async () => {
    const fixture = createEditor(false);
    const element = fixture.nativeElement as HTMLElement;
    const titleInput = getTitleInput(element);

    titleInput.value = '  New title ';
    titleInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const saveButton = element.querySelector<HTMLButtonElement>(
      '.save-bar button[aria-describedby]',
    )!;

    saveButton.click();
    await fixture.whenStable();

    expect(downloadBookJson).toHaveBeenCalledWith(
      {
        jsonContentDescription: 'JSON Book',
        book: {
          id: '111',
          title: 'New title',
          description: 'legacy',
          content: bookJson.book.content,
          headers: [
            { id: 0, text: 'First' },
            { id: 4, text: 'Last', isMarked: true },
          ],
          markedItems: [2],
        },
      },
      'book.book.json',
    );
    expect(TestBed.inject(BookStore).openBook()?.isSaved).toBe(true);
    expect(fixture.componentInstance.confirmLeave()).toBe(true);
  });

  it('disables Save while the title is empty', () => {
    const fixture = createEditor(true);
    const element = fixture.nativeElement as HTMLElement;
    const titleInput = getTitleInput(element);

    titleInput.value = ' ';
    titleInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(
      element.querySelector<HTMLButtonElement>('.save-bar button[aria-describedby]')!.disabled,
    ).toBe(true);
    expect(element.textContent).toContain('Title is required.');
  });

  async function importTranslationFile(
    fixture: ReturnType<typeof createEditor>,
    docxBookId: string,
  ): Promise<void> {
    const docxBlob = await createTranslationDocx({ ...bookJson.book, id: docxBookId });
    const fileInput = (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>(
      'app-file-picker-button input[type=file]',
    )!;

    // jsdom has no DataTransfer to build a real FileList.
    Object.defineProperty(fileInput, 'files', {
      value: [new File([docxBlob], 'book.to-translate.docx')],
      configurable: true,
    });
    fileInput.dispatchEvent(new Event('change'));
    await new Promise((resolve) => setTimeout(resolve, 50));
    await fixture.whenStable();
  }

  it('imports a translation of the same book into the open book', async () => {
    const fixture = createEditor(true);
    const element = fixture.nativeElement as HTMLElement;

    await importTranslationFile(fixture, '111');

    expect(element.querySelector('.notice')?.textContent).toContain('3 of 3 lines');
    expect(element.textContent).toContain('3 of 3 lines have a translation.');
    expect(fixture.componentInstance.confirmLeave()).toBeInstanceOf(Promise);

    element.querySelector<HTMLButtonElement>('.save-bar button[aria-describedby]')!.click();

    expect(downloadBookJson.mock.calls[0][0].book.translation).toEqual({
      '0-0': 'Zero',
      '2-0': 'Two',
      '4-0': 'Four',
    });
  });

  it('rejects a translation of a different book', async () => {
    const fixture = createEditor(true);
    const element = fixture.nativeElement as HTMLElement;

    await importTranslationFile(fixture, '999');

    expect(element.querySelector('[role=alert]')?.textContent).toContain(
      'This is a translation of a different book',
    );
    expect(element.textContent).toContain('0 of 3 lines have a translation.');
    expect(fixture.componentInstance.confirmLeave()).toBe(true);
  });

  it('closes the book when the page is destroyed', () => {
    const fixture = createEditor(true);

    fixture.destroy();

    expect(TestBed.inject(BookStore).openBook()).toBeNull();
  });
});
