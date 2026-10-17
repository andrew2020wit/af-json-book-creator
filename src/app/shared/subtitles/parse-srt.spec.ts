import { parseSrt } from './parse-srt';

describe('parseSrt', () => {
  it('reads numbered cues with multi-line text', () => {
    const srt = [
      '1',
      '00:00:01,500 --> 00:00:03,000',
      'Hello,',
      'world!',
      '',
      '2',
      '01:02:03,040 --> 01:02:04,000',
      'Bye.',
      '',
    ].join('\r\n');

    expect(parseSrt(srt)).toEqual([
      { startTimeMs: 1500, endTimeMs: 3000, text: 'Hello,\nworld!' },
      { startTimeMs: 3723040, endTimeMs: 3724000, text: 'Bye.' },
    ]);
  });

  it('removes HTML tags, ASS override blocks and decodes entities', () => {
    const srt = [
      '1',
      '00:00:01,000 --> 00:00:02,000',
      '{\\an8}<font color="#ffff00"><i>Tom</i> &amp; <b>Jerry</b></font>',
      '',
    ].join('\n');

    expect(parseSrt(srt)).toEqual([{ startTimeMs: 1000, endTimeMs: 2000, text: 'Tom & Jerry' }]);
  });

  it('tolerates dots, missing hours, short fractions, missing numbers and extra blank lines', () => {
    const srt = [
      '',
      '00:01.5 --> 00:02.25 X1:0 X2:100',
      'First',
      '',
      '',
      '00:00:03,000-->00:00:04,000',
      'Second',
    ].join('\n');

    expect(parseSrt(srt)).toEqual([
      { startTimeMs: 1500, endTimeMs: 2250, text: 'First' },
      { startTimeMs: 3000, endTimeMs: 4000, text: 'Second' },
    ]);
  });

  it('drops cues without text and orders cues by start time', () => {
    const srt = [
      '1',
      '00:00:05,000 --> 00:00:06,000',
      'Later',
      '',
      '2',
      '00:00:01,000 --> 00:00:02,000',
      '<i></i>',
      '',
      '3',
      '00:00:03,000 --> 00:00:04,000',
      'Earlier',
    ].join('\n');

    expect(parseSrt(srt).map((cue) => cue.text)).toEqual(['Earlier', 'Later']);
  });
});
