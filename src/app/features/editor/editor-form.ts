import { IBookHeader } from '../../../models/book.interface';

export interface HeaderFormValue {
  /** Stable identity of the row, used for tracking and focus; not saved. */
  key: number;
  paragraphId: number | null;
  title: string;
}

export interface EditorFormValue {
  title: string;
  headers: HeaderFormValue[];
}

/** A header as it was in the opened file, including legacy fields such as `isMarked`. */
export type SourceHeader = IBookHeader & Record<string, unknown>;

/** Builds a header for saving: legacy fields are kept, `id` and `text` come from the form. */
export function createSavedHeader(
  headerFormValue: HeaderFormValue,
  sourceHeader: SourceHeader | undefined,
): IBookHeader {
  return {
    ...sourceHeader,
    id: headerFormValue.paragraphId ?? 0,
    text: headerFormValue.title.trim(),
  };
}
