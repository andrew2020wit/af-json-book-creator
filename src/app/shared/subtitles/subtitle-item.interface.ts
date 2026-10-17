/** One subtitle cue. Same shape as `SubtitleItem` in `af-video-player`. */
export interface SubtitleItem {
  startTimeMs: number;
  endTimeMs: number;
  text: string;
}

/** An original cue with the text of the translation cues matched to it. */
export interface SubtitleItemWithTranslation extends SubtitleItem {
  /** Empty when no translation cue was matched. */
  translation: string;
}
