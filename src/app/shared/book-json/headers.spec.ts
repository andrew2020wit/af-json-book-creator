import {
  findDuplicateParagraphIds,
  getHeaderParagraphIdError,
  getHeaderTitleError,
  sortHeadersByParagraphId,
} from './headers';

describe('header rules', () => {
  const existingParagraphIds = new Set([0, 1, 5]);

  it('validates the paragraph id', () => {
    expect(getHeaderParagraphIdError(null, existingParagraphIds, false)).toBe(
      'Paragraph ID is required.',
    );
    expect(getHeaderParagraphIdError(1.5, existingParagraphIds, false)).toBe(
      'Paragraph ID must be a whole number.',
    );
    expect(getHeaderParagraphIdError(2, existingParagraphIds, false)).toBe(
      'There is no paragraph with this ID.',
    );
    expect(getHeaderParagraphIdError(5, existingParagraphIds, true)).toBe(
      'Another header already points to this paragraph.',
    );
    expect(getHeaderParagraphIdError(5, existingParagraphIds, false)).toBeNull();
  });

  it('requires a non-blank title', () => {
    expect(getHeaderTitleError('  ')).toBe('Title is required.');
    expect(getHeaderTitleError('Chapter')).toBeNull();
  });

  it('finds duplicate paragraph ids', () => {
    expect(findDuplicateParagraphIds([1, null, 2, 1, null, 2, 3])).toEqual(new Set([1, 2]));
  });

  it('sorts by paragraph id, keeps equal ids in order and puts empty ids last', () => {
    const headers = [
      { paragraphId: null, title: 'new' },
      { paragraphId: 7, title: 'b' },
      { paragraphId: 2, title: 'a' },
      { paragraphId: 7, title: 'c' },
    ];

    expect(
      sortHeadersByParagraphId(headers, (header) => header.paragraphId).map(
        (header) => header.title,
      ),
    ).toEqual(['a', 'b', 'c', 'new']);
  });
});
