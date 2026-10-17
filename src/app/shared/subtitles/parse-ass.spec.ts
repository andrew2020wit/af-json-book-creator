import { parseAss } from './parse-ass';

describe('parseAss', () => {
  it('reads dialogue lines of the [Events] section', () => {
    const ass = [
      '[Script Info]',
      'Title: Test',
      'ScriptType: v4.00+',
      '',
      '[V4+ Styles]',
      'Format: Name, Fontname',
      'Style: Default,Arial',
      '',
      '[Events]',
      'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
      'Comment: 0,0:00:00.00,0:00:01.00,Default,,0,0,0,,A comment',
      'Dialogue: 0,0:00:01.50,0:00:03.00,Default,,0,0,0,,{\\i1}Hello{\\i0}, world!\\NSecond line',
      'Dialogue: 0,1:02:03.04,1:02:04.00,Default,Bob,0,0,0,,Commas, are, kept\\hhere',
    ].join('\r\n');

    expect(parseAss(ass)).toEqual([
      { startTimeMs: 1500, endTimeMs: 3000, text: 'Hello, world!\nSecond line' },
      { startTimeMs: 3723040, endTimeMs: 3724000, text: 'Commas, are, kept here' },
    ]);
  });

  it('reads SSA v4 events with the Marked field', () => {
    const ssa = [
      '[Events]',
      'Format: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
      'Dialogue: Marked=0,0:00:01.00,0:00:02.00,Default,,0000,0000,0000,,<i>Hi</i> &amp; bye',
    ].join('\n');

    expect(parseAss(ssa)).toEqual([{ startTimeMs: 1000, endTimeMs: 2000, text: 'Hi & bye' }]);
  });

  it('drops cues without text and orders cues by start time', () => {
    const ass = [
      '[Events]',
      'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
      'Dialogue: 0,0:00:05.00,0:00:06.00,Default,,0,0,0,,Later',
      'Dialogue: 0,0:00:01.00,0:00:02.00,Default,,0,0,0,,{\\pos(10,10)}',
      'Dialogue: 0,0:00:03.00,0:00:04.00,Default,,0,0,0,,Earlier',
    ].join('\n');

    expect(parseAss(ass).map((cue) => cue.text)).toEqual(['Earlier', 'Later']);
  });
});
