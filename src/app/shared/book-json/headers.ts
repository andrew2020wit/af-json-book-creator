/** Validation and ordering rules of the "Headers" section (spec 4.5). */

export function getHeaderParagraphIdError(
  paragraphId: number | null,
  existingParagraphIds: ReadonlySet<number>,
  isUsedByAnotherHeader: boolean,
): string | null {
  if (paragraphId === null) {
    return 'Paragraph ID is required.';
  }

  if (!Number.isInteger(paragraphId)) {
    return 'Paragraph ID must be a whole number.';
  }

  if (!existingParagraphIds.has(paragraphId)) {
    return 'There is no paragraph with this ID.';
  }

  if (isUsedByAnotherHeader) {
    return 'Another header already points to this paragraph.';
  }

  return null;
}

export function getHeaderTitleError(title: string): string | null {
  return title.trim() ? null : 'Title is required.';
}

/** Paragraph ids that occur more than once. */
export function findDuplicateParagraphIds(paragraphIds: readonly (number | null)[]): Set<number> {
  const seenParagraphIds = new Set<number>();
  const duplicateParagraphIds = new Set<number>();

  for (const paragraphId of paragraphIds) {
    if (paragraphId === null) {
      continue;
    }

    if (seenParagraphIds.has(paragraphId)) {
      duplicateParagraphIds.add(paragraphId);
    }

    seenParagraphIds.add(paragraphId);
  }

  return duplicateParagraphIds;
}

/** Stable sort by paragraph id, ascending; headers without a paragraph id go last. */
export function sortHeadersByParagraphId<T>(
  headers: readonly T[],
  getParagraphId: (header: T) => number | null,
): T[] {
  return [...headers].sort((first, second) => {
    const firstParagraphId = getParagraphId(first);
    const secondParagraphId = getParagraphId(second);

    if (firstParagraphId === null || secondParagraphId === null) {
      return (firstParagraphId === null ? 1 : 0) - (secondParagraphId === null ? 1 : 0);
    }

    return firstParagraphId - secondParagraphId;
  });
}
