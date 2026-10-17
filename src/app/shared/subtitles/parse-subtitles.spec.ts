import { isSubtitleFileName, parseSubtitles, SubtitleParseError } from './parse-subtitles';

describe('parseSubtitles', () => {
  it('chooses the parser by the file extension', async () => {
    const srt = '1\n00:00:01,000 --> 00:00:02,000\nHi\n';
    const vtt = 'WEBVTT\n\n00:00:01.000 --> 00:00:02.000\nHi\n';
    const expected = [{ startTimeMs: 1000, endTimeMs: 2000, text: 'Hi' }];

    expect(await parseSubtitles('movie.SRT', srt)).toEqual(expected);
    expect(await parseSubtitles('movie.vtt', vtt)).toEqual(expected);
  });

  it('fails when the file has no subtitles', async () => {
    const srt = '1\n00:00:01,000 --> 00:00:02,000\nHi\n';

    await expect(parseSubtitles('movie.vtt', srt)).rejects.toBeInstanceOf(SubtitleParseError);
  });

  it('fails on an unsupported extension', async () => {
    await expect(parseSubtitles('movie.sub', '{1}{2}Hi')).rejects.toBeInstanceOf(
      SubtitleParseError,
    );
  });
});

describe('isSubtitleFileName', () => {
  it('accepts the supported extensions in any case', () => {
    expect(['a.srt', 'a.VTT', 'a.ass', 'a.ssa', 'a.sbv'].every(isSubtitleFileName)).toBe(true);
    expect(isSubtitleFileName('a.txt')).toBe(false);
  });
});
