import { clearMarkup } from './clear-markup';
import { SubtitleItem } from './subtitle-item.interface';

/**
 * Parses a WebVTT file like `Subtitles.setVttSubtitles` in `af-video-player`: the same
 * `webvtt-parser` library, times in milliseconds. Unlike the player, which removes only `<i>` and
 * `<b>`, all tags are removed and HTML entities are decoded. Cues without text are dropped.
 */
export async function parseVtt(text: string): Promise<SubtitleItem[]> {
  const { WebVTTParser } = await import('webvtt-parser');
  const webVttParser = new WebVTTParser();
  const tree = webVttParser.parse(text, 'subtitles');

  return tree.cues
    .map<SubtitleItem>((cue) => ({
      startTimeMs: cue.startTime * 1000,
      endTimeMs: cue.endTime * 1000,
      text: clearMarkup(cue.text).trim(),
    }))
    .filter((cue) => cue.text);
}
