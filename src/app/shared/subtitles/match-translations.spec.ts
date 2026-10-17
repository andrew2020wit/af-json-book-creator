import { matchTranslations } from './match-translations';
import { SubtitleItem } from './subtitle-item.interface';

function cue(startTimeMs: number, endTimeMs: number, text: string): SubtitleItem {
  return { startTimeMs, endTimeMs, text };
}

describe('matchTranslations', () => {
  it('matches one translation cue to one original cue with the same timing', () => {
    const result = matchTranslations(
      [cue(1000, 2000, 'Hello'), cue(3000, 4000, 'Bye')],
      [cue(1000, 2000, 'Привет'), cue(3000, 4000, 'Пока')],
    );

    expect(result).toEqual([
      { ...cue(1000, 2000, 'Hello'), translation: 'Привет' },
      { ...cue(3000, 4000, 'Bye'), translation: 'Пока' },
    ]);
  });

  it('gives an original cue every translation cue that starts before it ends', () => {
    const result = matchTranslations(
      [cue(1000, 5000, 'One long line'), cue(6000, 7000, 'Next')],
      [cue(1000, 2500, 'Первая часть'), cue(2600, 5000, 'вторая часть'), cue(6000, 7000, 'Дальше')],
    );

    expect(result.map((subtitle) => subtitle.translation)).toEqual([
      'Первая часть вторая часть',
      'Дальше',
    ]);
  });

  it('matches a translation cue that starts exactly when the original cue ends', () => {
    const result = matchTranslations(
      [cue(1000, 2000, 'A'), cue(3000, 4000, 'B')],
      [cue(2000, 3500, 'Б')],
    );

    expect(result.map((subtitle) => subtitle.translation)).toEqual(['Б', '']);
  });

  it('gives a translation cue to the first original cue that ends after it starts', () => {
    // The translation is shifted: it starts after the first original cue ends.
    const result = matchTranslations(
      [cue(1000, 2000, 'A'), cue(2100, 3000, 'B'), cue(3100, 4000, 'C')],
      [cue(2050, 2900, 'А'), cue(2950, 3900, 'Б')],
    );

    expect(result.map((subtitle) => subtitle.translation)).toEqual(['', 'А Б', '']);
  });

  it('leaves the translation empty when there are no translation cues', () => {
    const result = matchTranslations([cue(1000, 2000, 'A')], []);

    expect(result).toEqual([{ ...cue(1000, 2000, 'A'), translation: '' }]);
  });

  it('drops translation cues that start after the last original cue ends', () => {
    const result = matchTranslations(
      [cue(1000, 2000, 'A')],
      [cue(1000, 2000, 'А'), cue(9000, 9500, 'Б')],
    );

    expect(result.map((subtitle) => subtitle.translation)).toEqual(['А']);
  });

  it('matches a translation cue that starts at 0 ms', () => {
    const result = matchTranslations(
      [cue(0, 1000, 'A'), cue(1000, 2000, 'B')],
      [cue(0, 900, 'А'), cue(1100, 2000, 'Б')],
    );

    expect(result.map((subtitle) => subtitle.translation)).toEqual(['А', 'Б']);
  });
});
