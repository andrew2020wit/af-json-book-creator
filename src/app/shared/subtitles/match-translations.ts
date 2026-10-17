import { SubtitleItem, SubtitleItemWithTranslation } from './subtitle-item.interface';

/**
 * Matches translation cues to original cues. Port of `Subtitles.allSubtitles` from
 * `af-video-player`: both lists are walked in order, and every translation cue that has not been
 * taken yet and starts no later than the original cue ends goes to that original cue.
 *
 * Differences from the player:
 * - the texts of several matched cues are joined with a space (the player joins them without a
 *   separator);
 * - a translation cue that starts at 0 ms is matched too (the player treats a zero start time as
 *   "no cue" and then matches nothing at all).
 */
export function matchTranslations(
  originalSubtitles: readonly SubtitleItem[],
  translationSubtitles: readonly SubtitleItem[],
): SubtitleItemWithTranslation[] {
  let nextTranslationIndex = 0;

  return originalSubtitles.map<SubtitleItemWithTranslation>((originalSubtitle) => {
    const translationTexts: string[] = [];

    while (
      nextTranslationIndex < translationSubtitles.length &&
      translationSubtitles[nextTranslationIndex].startTimeMs <= originalSubtitle.endTimeMs
    ) {
      translationTexts.push(translationSubtitles[nextTranslationIndex].text);
      nextTranslationIndex++;
    }

    return { ...originalSubtitle, translation: translationTexts.join(' ') };
  });
}
