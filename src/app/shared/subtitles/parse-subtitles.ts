import { getFileExtension } from '../book-json/file-names';
import { parseAss } from './parse-ass';
import { parseSbv } from './parse-sbv';
import { parseSrt } from './parse-srt';
import { parseVtt } from './parse-vtt';
import { SubtitleItem } from './subtitle-item.interface';

export const subtitleFileExtensions = ['.srt', '.vtt', '.ass', '.ssa', '.sbv'] as const;

export class SubtitleParseError extends Error {
  override readonly name = 'SubtitleParseError';
}

export function isSubtitleFileName(fileName: string): boolean {
  return (subtitleFileExtensions as readonly string[]).includes(getFileExtension(fileName));
}

/**
 * Parses a subtitle file; the format is chosen by the file extension. Cue text has no markup;
 * cues without text are dropped.
 */
export async function parseSubtitles(fileName: string, text: string): Promise<SubtitleItem[]> {
  const subtitles = await parseByExtension(getFileExtension(fileName), text);

  if (subtitles.length === 0) {
    throw new SubtitleParseError(
      'No subtitles found. Check that the file extension matches its format.',
    );
  }

  return subtitles;
}

async function parseByExtension(extension: string, text: string): Promise<SubtitleItem[]> {
  switch (extension) {
    case '.vtt':
      return parseVtt(text);
    case '.srt':
      return parseSrt(text);
    case '.ass':
    case '.ssa':
      return parseAss(text);
    case '.sbv':
      return parseSbv(text);
    default:
      throw new SubtitleParseError(
        `Unsupported subtitle format. Supported: ${subtitleFileExtensions.join(', ')}.`,
      );
  }
}
