import { SubtitleItem } from './subtitle-item.interface';
import { convertSubtitlesToBook, formatTimestamp } from './subtitles-to-book';

function cue(startTimeMs: number, endTimeMs: number, text: string): SubtitleItem {
  return { startTimeMs, endTimeMs, text };
}

describe('formatTimestamp', () => {
  it('omits zero hours', () => {
    expect(formatTimestamp(0)).toBe('00:00');
    expect(formatTimestamp(65_999)).toBe('01:05');
    expect(formatTimestamp(3_599_999)).toBe('59:59');
  });

  it('shows hours when they are not zero', () => {
    expect(formatTimestamp(3_600_000)).toBe('01:00:00');
    expect(formatTimestamp(37_230_500)).toBe('10:20:30');
  });
});

describe('convertSubtitlesToBook', () => {
  it('creates one paragraph per cue with the start time and the translation', () => {
    const bookJson = convertSubtitlesToBook(
      'Movie.en.vtt',
      [cue(1500, 3000, 'Hello,\nworld!'), cue(3_725_000, 3_726_000, 'Bye.')],
      [cue(1500, 3000, 'Привет,\nмир!'), cue(3_725_000, 3_726_000, 'Пока.')],
      1700000000000,
    );

    expect(bookJson).toEqual({
      jsonContentDescription: 'ForeignReaderBook',
      book: {
        id: '1700000000000',
        title: 'Movie.en',
        content: [
          { id: 0, text: ['00:01 Hello, world!'] },
          { id: 1, text: ['01:02:05 Bye.'] },
        ],
        translation: { '0-0': 'Привет, мир!', '1-0': 'Пока.' },
        markedItems: [],
        headers: [],
      },
    });
  });

  it('creates a book without a translation when there are no translation cues', () => {
    const bookJson = convertSubtitlesToBook('movie.vtt', [cue(0, 1000, 'Hi')], [], 1);

    expect(bookJson.book.content).toEqual([{ id: 0, text: ['00:00 Hi'] }]);
    expect(bookJson.book.translation).toBeUndefined();
  });

  it('skips cues without text and keeps paragraph ids sequential', () => {
    const bookJson = convertSubtitlesToBook(
      'movie.vtt',
      [cue(1000, 2000, 'A'), cue(3000, 4000, ' \n '), cue(5000, 6000, 'C')],
      [cue(1000, 2000, 'А'), cue(5000, 6000, 'В')],
      1,
    );

    expect(bookJson.book.content).toEqual([
      { id: 0, text: ['00:01 A'] },
      { id: 1, text: ['00:05 C'] },
    ]);
    expect(bookJson.book.translation).toEqual({ '0-0': 'А', '1-0': 'В' });
  });

  it('creates no translation key for a cue without a matched translation', () => {
    const bookJson = convertSubtitlesToBook(
      'movie.vtt',
      [cue(1000, 2000, 'A'), cue(3000, 4000, 'B')],
      [cue(3000, 4000, 'Б')],
      1,
    );

    expect(bookJson.book.translation).toEqual({ '1-0': 'Б' });
  });
});
