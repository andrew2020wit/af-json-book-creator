import { clearMarkup } from './clear-markup';
import { SubtitleItem } from './subtitle-item.interface';
import { sortByStartTime, splitLines, toMilliseconds } from './subtitle-time';

// `0:00:01.50` (hours:minutes:seconds.centiseconds)
const assTimePattern = /^(\d+):(\d{1,2}):(\d{1,2})\.(\d{1,3})$/;

// The field order of the SSA v4 / ASS `[Events]` section when it has no `Format:` line.
const defaultFormatFields = [
  'layer',
  'start',
  'end',
  'style',
  'name',
  'marginl',
  'marginr',
  'marginv',
  'effect',
  'text',
];

/**
 * Parses an Advanced SubStation Alpha (`.ass`) or SubStation Alpha (`.ssa`) file: the `Dialogue:`
 * lines of the `[Events]` section. Override tags (`{\i1}`) and HTML tags are removed, `\N` and `\n`
 * become line breaks. Cues without text are dropped; cues are ordered by start time.
 */
export function parseAss(text: string): SubtitleItem[] {
  const cues: SubtitleItem[] = [];
  let isEventsSection = false;
  let formatFields = defaultFormatFields;

  for (const rawLine of splitLines(text)) {
    const line = rawLine.trim();

    if (line.startsWith('[')) {
      isEventsSection = line.toLowerCase() === '[events]';

      continue;
    }

    if (!isEventsSection) {
      continue;
    }

    const colonIndex = line.indexOf(':');

    if (colonIndex < 0) {
      continue;
    }

    const lineType = line.slice(0, colonIndex).trim().toLowerCase();
    const value = line.slice(colonIndex + 1).trim();

    if (lineType === 'format') {
      formatFields = value.split(',').map((field) => field.trim().toLowerCase());
    } else if (lineType === 'dialogue') {
      const cue = parseDialogue(value, formatFields);

      if (cue) {
        cues.push(cue);
      }
    }
  }

  return sortByStartTime(cues);
}

function parseDialogue(value: string, formatFields: readonly string[]): SubtitleItem | null {
  // Text is the last field and may contain commas.
  const fieldValues = value.split(',');
  const textFieldIndex = formatFields.length - 1;
  const fields = [
    ...fieldValues.slice(0, textFieldIndex),
    fieldValues.slice(textFieldIndex).join(','),
  ];
  const getField = (name: string): string => fields[formatFields.indexOf(name)]?.trim() ?? '';

  const startTimeMs = parseAssTime(getField('start'));
  const endTimeMs = parseAssTime(getField('end'));
  const cueText = clearAssText(getField('text'));

  if (startTimeMs === null || endTimeMs === null || !cueText) {
    return null;
  }

  return { startTimeMs, endTimeMs, text: cueText };
}

function parseAssTime(time: string): number | null {
  const match = assTimePattern.exec(time);

  return match ? toMilliseconds(match[1], match[2], match[3], match[4]) : null;
}

function clearAssText(text: string): string {
  return clearMarkup(text.replaceAll(/\{[^}]*\}/g, ''))
    .replaceAll(/\\[Nn]/g, '\n')
    .replaceAll('\\h', ' ')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
}
