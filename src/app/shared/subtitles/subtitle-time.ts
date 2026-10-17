/**
 * Converts time parts to milliseconds. `fraction` is the digits after the decimal separator:
 * `5` → 500 ms, `25` → 250 ms, `125` → 125 ms.
 */
export function toMilliseconds(
  hours: string | undefined,
  minutes: string,
  seconds: string,
  fraction: string,
): number {
  const milliseconds = Number(fraction.padEnd(3, '0').slice(0, 3));

  return ((Number(hours ?? 0) * 60 + Number(minutes)) * 60 + Number(seconds)) * 1000 + milliseconds;
}

/** Splits a text file into lines with any line breaks. */
export function splitLines(text: string): string[] {
  return text.split(/\r\n|\r|\n/);
}

/** Orders cues by start time; cues that start together keep their order. */
export function sortByStartTime<T extends { startTimeMs: number }>(cues: T[]): T[] {
  return [...cues].sort((first, second) => first.startTimeMs - second.startTimeMs);
}
