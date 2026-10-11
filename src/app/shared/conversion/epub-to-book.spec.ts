import { createTestEpub } from '../../../testing/test-epub';
import { ZipArchiveError } from '../archive/zip-archive';
import { convertEpubToBook } from './epub-to-book';

describe('convertEpubToBook', () => {
  for (const tocType of ['nav', 'ncx'] as const) {
    it(`converts chapters and creates headers from the ${tocType} table of contents`, async () => {
      const bytes = createTestEpub({
        title: 'The Story',
        creator: 'Jane Doe',
        tocType,
        chapters: [
          {
            fileName: 'ch1.xhtml',
            tocTitle: 'Chapter 1',
            body: '<h1>One</h1><p>It was cold. Yes.</p>',
          },
          { fileName: 'ch2.xhtml', body: '<p>No TOC entry here.</p>' },
          { fileName: 'ch3.xhtml', tocTitle: ' Chapter\n 3 ', body: '<p>The end</p>' },
        ],
      });

      const bookJson = await convertEpubToBook('story.epub', bytes, 42);

      expect(bookJson).toEqual({
        jsonContentDescription: 'ForeignReaderBook',
        book: {
          id: '42',
          title: 'Jane Doe - The Story',
          content: [
            { id: 0, text: ['One'] },
            { id: 1, text: ['It was cold.', 'Yes.'] },
            { id: 2, text: ['No TOC entry here.'] },
            { id: 3, text: ['The end'] },
          ],
          markedItems: [],
          headers: [
            { id: 0, text: 'Chapter 1' },
            { id: 3, text: 'Chapter 3' },
          ],
        },
      });
    });
  }

  it('skips headers for empty chapters and empty titles', async () => {
    const bytes = createTestEpub({
      title: 'Book',
      tocType: 'nav',
      chapters: [
        { fileName: 'cover.xhtml', tocTitle: 'Cover', body: '<div>  </div>' },
        { fileName: 'ch1.xhtml', tocTitle: '', body: '<p>Text one</p>' },
        { fileName: 'ch2.xhtml', tocTitle: 'Two', body: '<p>Text two</p>' },
      ],
    });

    const bookJson = await convertEpubToBook('book.epub', bytes, 1);

    expect(bookJson.book.title).toBe('Book');
    expect(bookJson.book.headers).toEqual([{ id: 1, text: 'Two' }]);
  });

  it('reads a nav document that is not valid XHTML', async () => {
    const bytes = createTestEpub({
      tocType: 'nav',
      chapters: [{ fileName: 'ch1.xhtml', tocTitle: 'Chapter&nbsp;1', body: '<p>Text</p>' }],
    });

    const bookJson = await convertEpubToBook('book.epub', bytes, 1);

    expect(bookJson.book.headers).toEqual([{ id: 0, text: 'Chapter 1' }]);
  });

  it('converts the book without headers when the NCX is not valid XML', async () => {
    const bytes = createTestEpub({
      tocType: 'ncx',
      chapters: [{ fileName: 'ch1.xhtml', tocTitle: 'Chapter&nbsp;1', body: '<p>Text</p>' }],
    });

    const bookJson = await convertEpubToBook('book.epub', bytes, 1);

    expect(bookJson.book.content).toEqual([{ id: 0, text: ['Text'] }]);
    expect(bookJson.book.headers).toEqual([]);
  });

  it('uses the file name as the title when the metadata has no title', async () => {
    const bytes = createTestEpub({
      tocType: 'ncx',
      chapters: [{ fileName: 'ch1.xhtml', body: '<p>Text</p>' }],
    });

    expect((await convertEpubToBook('My Book.epub', bytes, 1)).book.title).toBe('My Book');
  });

  it('rejects a file that is not an EPUB archive', async () => {
    await expect(
      convertEpubToBook('book.epub', new TextEncoder().encode('text'), 1),
    ).rejects.toBeInstanceOf(ZipArchiveError);
  });
});
