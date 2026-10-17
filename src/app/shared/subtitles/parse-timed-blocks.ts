import { clearMarkup } from './clear-markup';
import { SubtitleItem } from './subtitle-item.interface';
import { sortByStartTime, splitLines } from './subtitle-time';

type CueTiming = Pick<SubtitleItem, 'startTimeMs' | 'endTimeMs'>;

/**
 * Parses formats made of blocks "timing line + text lines", separated by blank lines (SRT, SBV).
 * Lines before the timing line (SRT cue numbers) are ignored. Cues without text are dropped.
 */
export function parseTimedBlocks(
  text: string,
  parseTimingLine: (line: string) => CueTiming | null,
): SubtitleItem[] {
  const cues: SubtitleItem[] = [];
  let currentCue: (CueTiming & { lines: string[] }) | null = null;

  const finishCue = (): void => {
    if (currentCue) {
      const cueText = clearMarkup(currentCue.lines.join('\n')).trim();

      if (cueText) {
        cues.push({
          startTimeMs: currentCue.startTimeMs,
          endTimeMs: currentCue.endTimeMs,
          text: cueText,
        });
      }
    }

    currentCue = null;
  };

  for (const line of splitLines(text)) {
    const timing = parseTimingLine(line.trim());

    if (timing) {
      finishCue();
      currentCue = { ...timing, lines: [] };
    } else if (!line.trim()) {
      finishCue();
    } else if (currentCue) {
      currentCue.lines.push(line.trim());
    }
  }

  finishCue();

  return sortByStartTime(cues);
}
