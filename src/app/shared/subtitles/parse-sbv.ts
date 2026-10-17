import { parseTimedBlocks } from './parse-timed-blocks';
import { SubtitleItem } from './subtitle-item.interface';
import { toMilliseconds } from './subtitle-time';

// `0:00:01.000,0:00:03.500`
const sbvTimingPattern =
  /^(\d+):(\d{1,2}):(\d{1,2})\.(\d{1,3})\s*,\s*(\d+):(\d{1,2}):(\d{1,2})\.(\d{1,3})$/;

/** Parses a YouTube SubViewer (`.sbv`) file. */
export function parseSbv(text: string): SubtitleItem[] {
  return parseTimedBlocks(text, (line) => {
    const match = sbvTimingPattern.exec(line);

    if (!match) {
      return null;
    }

    return {
      startTimeMs: toMilliseconds(match[1], match[2], match[3], match[4]),
      endTimeMs: toMilliseconds(match[5], match[6], match[7], match[8]),
    };
  });
}
