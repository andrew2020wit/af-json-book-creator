import { parseSbv } from './parse-sbv';

describe('parseSbv', () => {
  it('reads cues', () => {
    const sbv = [
      '0:00:01.500,0:00:03.000',
      'Hello,',
      'world!',
      '',
      '1:02:03.040,1:02:04.000',
      'Bye.',
      '',
    ].join('\n');

    expect(parseSbv(sbv)).toEqual([
      { startTimeMs: 1500, endTimeMs: 3000, text: 'Hello,\nworld!' },
      { startTimeMs: 3723040, endTimeMs: 3724000, text: 'Bye.' },
    ]);
  });

  it('removes HTML tags', () => {
    expect(parseSbv('0:00:01.000,0:00:02.000\n<i>Hi</i>')).toEqual([
      { startTimeMs: 1000, endTimeMs: 2000, text: 'Hi' },
    ]);
  });
});
