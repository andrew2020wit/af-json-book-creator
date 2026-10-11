import { splitParagraphToLines, splitTextToParagraphs } from './split-text';

describe('splitParagraphToLines', () => {
  it('splits by sentence separators and keeps the separator at the end of the line', () => {
    expect(splitParagraphToLines('It was cold. He left! Why? Fine; ok')).toEqual([
      'It was cold.',
      'He left!',
      'Why?',
      'Fine;',
      'ok',
    ]);
  });

  it('splits after a colon and an ellipsis even without a following space', () => {
    expect(splitParagraphToLines('He said:yes…and left')).toEqual(['He said:', 'yes…', 'and left']);
  });

  it('splits after closing quotes followed by a space', () => {
    expect(splitParagraphToLines('“Go” she said')).toEqual(['“Go”', 'she said']);
  });

  it('returns no lines for whitespace-only text', () => {
    expect(splitParagraphToLines(' \t ')).toEqual([]);
  });
});

describe('splitTextToParagraphs', () => {
  it('makes one paragraph per non-empty source line with sequential ids', () => {
    const text = 'First line. Second sentence\r\n\r\n   \nThird';

    expect(splitTextToParagraphs(text)).toEqual([
      { id: 0, text: ['First line.', 'Second sentence'] },
      { id: 1, text: ['Third'] },
    ]);
  });

  it('splits paragraphs by classic Mac line breaks', () => {
    expect(splitTextToParagraphs('First\rSecond')).toEqual([
      { id: 0, text: ['First'] },
      { id: 1, text: ['Second'] },
    ]);
  });

  it('starts ids from the given first id', () => {
    expect(splitTextToParagraphs('a\nb', 10).map((paragraph) => paragraph.id)).toEqual([10, 11]);
  });

  it('returns no paragraphs for empty text', () => {
    expect(splitTextToParagraphs('\n\n')).toEqual([]);
  });
});
