import { IBook } from '../../../models/book.interface';
import {
  createTranslationDocx,
  createTranslationDocxParagraphs,
  docxMimeType,
} from './create-translation-docx';
import { parseTranslation, readTranslationBookId } from './parse-translation';
import { readDocxParagraphs } from './read-docx-paragraphs';

const book: IBook = {
  id: '1700000000000',
  title: 'Book',
  content: [
    { id: 0, text: ['Hello.', 'How are you?'] },
    { id: 5, text: ['Bye'] },
  ],
  markedItems: [],
  headers: [],
};

describe('translation DOCX', () => {
  it('lists the book id marker and a marker before every line, using paragraph ids', () => {
    expect(createTranslationDocxParagraphs(book)).toEqual([
      '[[[[1700000000000]]]]',
      '[[[0]]](((0)))',
      'Hello.',
      '[[[0]]](((1)))',
      'How are you?',
      '[[[5]]](((0)))',
      'Bye',
    ]);
  });

  it('creates a DOCX that reads back as the same paragraphs', async () => {
    const blob = await createTranslationDocx(book);
    const docxParagraphs = await readDocxParagraphs(new Uint8Array(await blob.arrayBuffer()));

    expect(blob.type).toBe(docxMimeType);
    expect(docxParagraphs).toEqual(createTranslationDocxParagraphs(book));
    expect(readTranslationBookId(docxParagraphs)).toBe('1700000000000');
  });

  it('escapes XML special characters and drops characters XML does not allow', async () => {
    const specialBook: IBook = {
      ...book,
      content: [{ id: 0, text: ['Tom & "Jerry" <3 \u0007bell', '  spaced  '] }],
    };

    const blob = await createTranslationDocx(specialBook);
    const docxParagraphs = await readDocxParagraphs(new Uint8Array(await blob.arrayBuffer()));

    expect(docxParagraphs.slice(2)).toEqual([
      'Tom & "Jerry" <3 bell',
      '[[[0]]](((1)))',
      '  spaced  ',
    ]);
  });

  it('has the parts Word needs to open the package', async () => {
    const { unzipSync } = await import('fflate');
    const blob = await createTranslationDocx(book);
    const entryPaths = Object.keys(unzipSync(new Uint8Array(await blob.arrayBuffer())));

    expect(entryPaths.sort()).toEqual(['[Content_Types].xml', '_rels/.rels', 'word/document.xml']);
  });
});

describe('parseTranslation', () => {
  it('maps translated paragraphs to line keys', () => {
    const docxParagraphs = [
      '[[[[1700000000000]]]]',
      '[[[0]]](((0)))',
      'Привет.',
      '[[[ 0 ]]] ((( 1 )))',
      '  Как дела?  ',
      '[[[5]]](((0)))',
      'Пока',
    ];

    expect(parseTranslation(docxParagraphs, book)).toEqual({
      translation: { '0-0': 'Привет.', '0-1': 'Как дела?', '5-0': 'Пока' },
      totalLineCount: 3,
      translatedLineCount: 3,
      skippedMarkerCount: 0,
    });
  });

  it('skips empty translations, unknown lines and text without a marker', () => {
    const docxParagraphs = [
      '',
      '[[[[1700000000000]]]]',
      'Stray text',
      '[[[0]]](((0)))',
      '',
      '[[[0]]](((1)))',
      '[[[9]]](((0)))',
      'Unknown line',
      '[[[5]]](((0))) Пока',
    ];

    expect(parseTranslation(docxParagraphs, book)).toEqual({
      translation: { '5-0': 'Пока' },
      totalLineCount: 3,
      translatedLineCount: 1,
      skippedMarkerCount: 1,
    });
  });

  it('reads no book id from a document without the marker', () => {
    expect(readTranslationBookId(['Just text'])).toBeNull();
    expect(readTranslationBookId([])).toBeNull();
  });
});
