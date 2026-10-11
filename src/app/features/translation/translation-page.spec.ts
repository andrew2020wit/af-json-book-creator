import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { IBookJson } from '../../../models/book-json.interface';
import { BookFilesService } from '../../core/book-files/book-files.service';
import { BookStore } from '../../core/book-store/book-store';
import { createTranslationDocx } from '../../shared/translation-docx/create-translation-docx';
import { TranslationPage } from './translation-page';

const bookJson: IBookJson = {
  book: {
    id: '777',
    title: 'Book',
    content: [
      { id: 0, text: ['Hello.'] },
      { id: 5, text: ['Bye'] },
    ],
    translation: { '0-0': 'Old' },
    markedItems: [],
    headers: [],
  },
};

describe('TranslationPage', () => {
  async function selectFile(element: HTMLElement, inputIndex: number, file: File): Promise<void> {
    const fileInput = element.querySelectorAll<HTMLInputElement>('input[type=file]')[inputIndex];
    // jsdom has no DataTransfer to build a real FileList.
    Object.defineProperty(fileInput, 'files', { value: [file], configurable: true });
    fileInput.dispatchEvent(new Event('change'));
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  async function createPage() {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });

    const fixture = TestBed.createComponent(TranslationPage);

    await fixture.whenStable();

    return fixture;
  }

  function getImportButton(element: HTMLElement): HTMLButtonElement {
    return element.querySelector<HTMLButtonElement>('.import-button')!;
  }

  it('imports the translation when the book ids match and opens the editor', async () => {
    const fixture = await createPage();
    const element = fixture.nativeElement as HTMLElement;
    const navigateSpy = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    const docxBlob = await createTranslationDocx(bookJson.book);

    await selectFile(element, 1, new File([docxBlob], 'book.to-translate.docx'));
    await fixture.whenStable();

    expect(getImportButton(element).disabled).toBe(true);

    await selectFile(element, 0, new File([JSON.stringify(bookJson)], 'book.book.json'));
    await fixture.whenStable();

    expect(element.textContent).toContain('The book IDs match');
    expect(getImportButton(element).disabled).toBe(false);

    getImportButton(element).click();
    await fixture.whenStable();

    const openBook = TestBed.inject(BookStore).openBook();

    expect(openBook?.bookJson.book.translation).toEqual({ '0-0': 'Hello.', '5-0': 'Bye' });
    expect(openBook?.fileName).toBe('book.book.json');
    expect(openBook?.isSaved).toBe(false);
    expect(openBook?.notice).toContain('2 of 2 lines');
    expect(navigateSpy).toHaveBeenCalledWith('/editor');
  });

  it('keeps the import disabled when the book ids differ', async () => {
    const fixture = await createPage();
    const element = fixture.nativeElement as HTMLElement;
    const docxBlob = await createTranslationDocx({ ...bookJson.book, id: '999' });

    await selectFile(element, 0, new File([JSON.stringify(bookJson)], 'book.book.json'));
    await selectFile(element, 1, new File([docxBlob], 'other.to-translate.docx'));
    await fixture.whenStable();

    expect(element.textContent).toContain('a translation of a different book');
    expect(getImportButton(element).disabled).toBe(true);
  });

  it('exports the translation file of the selected book', async () => {
    const fixture = await createPage();
    const element = fixture.nativeElement as HTMLElement;
    const downloadTranslationDocx = vi
      .spyOn(TestBed.inject(BookFilesService), 'downloadTranslationDocx')
      .mockResolvedValue(undefined);
    const exportButton = () => element.querySelector<HTMLButtonElement>('.export-button')!;

    expect(exportButton().disabled).toBe(true);

    await selectFile(element, 0, new File([JSON.stringify(bookJson)], 'book.book.json'));
    await fixture.whenStable();
    exportButton().click();
    await fixture.whenStable();

    expect(downloadTranslationDocx).toHaveBeenCalledWith(bookJson.book, 'book.book.json');
  });

  it('shows an error for a DOCX without a book id', async () => {
    const fixture = await createPage();
    const element = fixture.nativeElement as HTMLElement;

    await selectFile(element, 1, new File(['not a docx'], 'random.docx'));
    await fixture.whenStable();

    expect(element.querySelector('[role=alert]')?.textContent).toContain(
      'The file is damaged or has an unexpected format.',
    );
  });
});
