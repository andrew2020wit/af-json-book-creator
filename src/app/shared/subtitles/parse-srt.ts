import { parseTimedBlocks } from './parse-timed-blocks';
import { SubtitleItem } from './subtitle-item.interface';
import { toMilliseconds } from './subtitle-time';

// `00:01:02,500 --> 00:01:04,000`; a dot instead of the comma and missing hours are tolerated.
const srtTimingPattern =
  /^(?:(\d+):)?(\d{1,2}):(\d{1,2})[,.](\d{1,3})\s*-->\s*(?:(\d+):)?(\d{1,2}):(\d{1,2})[,.](\d{1,3})/;

/** Parses a SubRip (`.srt`) file. */
export function parseSrt(text: string): SubtitleItem[] {
  return parseTimedBlocks(text, (line) => {
    const match = srtTimingPattern.exec(line);

    if (!match) {
      return null;
    }

    return {
      startTimeMs: toMilliseconds(match[1], match[2], match[3], match[4]),
      endTimeMs: toMilliseconds(match[5], match[6], match[7], match[8]),
    };
  });
}
