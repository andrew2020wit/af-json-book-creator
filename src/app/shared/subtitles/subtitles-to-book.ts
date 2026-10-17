import { IBookJson } from '../../../models/book-json.interface';
import { IBookParagraph } from '../../../models/book.interface';
import { foreignReaderJsonContentDescription } from '../book-json/book-json.const';
import { getFileNameWithoutExtension } from '../book-json/file-names';
import { matchTranslations } from './match-translations';
import { SubtitleItem } from './subtitle-item.interface';

/**
 * Creates a JSON Book from subtitles: one cue = one paragraph with one line,
 * `<timestamp> <cue text>`. The matched translation cues become the line's translation.
 * Cues without text are skipped. `now` becomes the book id.
 */
export function convertSubtitlesToBook(
  fileName: string,
  originalSubtitles: readonly SubtitleItem[],
  translationSubtitles: readonly SubtitleItem[],
  now: number,
): IBookJson {
  const content: IBookParagraph[] = [];
  const translation: Record<string, string> = {};

  for (const subtitle of matchTranslations(originalSubtitles, translationSubtitles)) {
    const text = normalizeCueText(subtitle.text);

    if (!text) {
      continue;
    }

    const paragraphId = content.length;
    const translationText = normalizeCueText(subtitle.translation);

    content.push({ id: paragraphId, text: [`${formatTimestamp(subtitle.startTimeMs)} ${text}`] });

    if (translationText) {
      translation[`${paragraphId}-0`] = translationText;
    }
  }

  return {
    jsonContentDescription: foreignReaderJsonContentDescription,
    book: {
      id: String(now),
      title: getFileNameWithoutExtension(fileName),
      content,
      ...(Object.keys(translation).length > 0 ? { translation } : {}),
      markedItems: [],
      headers: [],
    },
  };
}

/** `hh:mm:ss`, or `mm:ss` when the hours are zero. */
export function formatTimestamp(timeMs: number): string {
  const totalSeconds = Math.floor(timeMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = totalSeconds % 60;
  const minutesAndSeconds = `${padTimePart(minutes)}:${padTimePart(seconds)}`;

  return hours > 0 ? `${padTimePart(hours)}:${minutesAndSeconds}` : minutesAndSeconds;
}

function padTimePart(value: number): string {
  return String(value).padStart(2, '0');
}

/** A cue may have several lines: they are joined into one book line. */
function normalizeCueText(text: string): string {
  return text.replaceAll(/\s+/g, ' ').trim();
}
