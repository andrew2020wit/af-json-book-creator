import { TestBed } from '@angular/core/testing';
import { createTestEpub } from '../../../testing/test-epub';
import { ZipArchiveError } from '../../shared/archive/zip-archive';
import { BookFilesService, getFileErrorMessage, UnsupportedFileError } from './book-files.service';

describe('BookFilesService', () => {
  let bookFilesService: BookFilesService;

  beforeEach(() => {
    bookFilesService = TestBed.inject(BookFilesService);
  });

  it('converts TXT and EPUB files', async () => {
    const txtFile = new File(['Hello. World'], 'Story.TXT');
    const epubFile = new File(
      [
        createTestEpub({
          title: 'E',
          tocType: 'nav',
          chapters: [{ fileName: 'a.xhtml', body: '<p>Hi</p>' }],
        }),
      ],
      'book.epub',
    );

    expect((await bookFilesService.convertSourceFile(txtFile)).book.content).toEqual([
      { id: 0, text: ['Hello.', 'World'] },
    ]);
    expect((await bookFilesService.convertSourceFile(epubFile)).book.title).toBe('E');
  });

  it('gives books converted in a row different ids', async () => {
    const bookIds = new Set<string>();

    for (let i = 0; i < 5; i++) {
      bookIds.add((await bookFilesService.convertSourceFile(new File(['a'], 'a.txt'))).book.id);
    }

    expect(bookIds.size).toBe(5);
  });

  it('rejects unsupported source files', async () => {
    await expect(
      bookFilesService.convertSourceFile(new File(['a'], 'a.pdf')),
    ).rejects.toBeInstanceOf(UnsupportedFileError);
  });

  it('reads JSON book files and rejects other extensions', async () => {
    const bookJsonText = JSON.stringify({
      book: { id: '1', title: 't', content: [], markedItems: [], headers: [] },
    });

    expect(
      (await bookFilesService.readBookJsonFile(new File([bookJsonText], 'b.book.json'))).isValid,
    ).toBe(true);
    expect(await bookFilesService.readBookJsonFile(new File([bookJsonText], 'b.txt'))).toEqual({
      isValid: false,
      errors: ['Only .json files can be opened.'],
    });
  });

  it('turns errors into user messages', () => {
    expect(getFileErrorMessage(new UnsupportedFileError('Nope.'))).toBe('Nope.');
    expect(getFileErrorMessage(new ZipArchiveError('Bad zip.'))).toBe(
      'The file is damaged or has an unexpected format.',
    );
    expect(getFileErrorMessage(new Error('internal'))).toBe('The file could not be read.');
  });
});
