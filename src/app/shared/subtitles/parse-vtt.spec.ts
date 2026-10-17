import { parseVtt } from './parse-vtt';

describe('parseVtt', () => {
  it('reads cue times in milliseconds and removes tags', async () => {
    const vtt = [
      'WEBVTT',
      '',
      '00:01.500 --> 00:03.000',
      '<i>Hello</i>, <b>world</b> &amp; <c.yellow>friends</c>',
      '',
      '2',
      '01:02:03.000 --> 01:02:04.250',
      '<v Bob>Two',
      'lines',
      '',
    ].join('\n');

    expect(await parseVtt(vtt)).toEqual([
      { startTimeMs: 1500, endTimeMs: 3000, text: 'Hello, world & friends' },
      { startTimeMs: 3723000, endTimeMs: 3724250, text: 'Two\nlines' },
    ]);
  });

  it('reads a file with Windows line breaks', async () => {
    const vtt = 'WEBVTT\r\n\r\n00:00:01.000 --> 00:00:02.000\r\nHi\r\n';

    expect(await parseVtt(vtt)).toEqual([{ startTimeMs: 1000, endTimeMs: 2000, text: 'Hi' }]);
  });

  it('drops cues that have only markup', async () => {
    const vtt = 'WEBVTT\n\n00:00:01.000 --> 00:00:02.000\n<i></i>\n';

    expect(await parseVtt(vtt)).toEqual([]);
  });

  it('finds no cues in an SRT file', async () => {
    expect(await parseVtt('1\n00:00:01,000 --> 00:00:02,000\nHi\n')).toEqual([]);
  });
});
