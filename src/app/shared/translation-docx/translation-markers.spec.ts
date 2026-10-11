import {
  createBookIdMarker,
  createLineMarker,
  parseBookIdMarker,
  parseLineMarker,
} from './translation-markers';

describe('translation markers', () => {
  it('creates markers compatible with json-book-utils', () => {
    expect(createBookIdMarker('1700000000000')).toBe('[[[[1700000000000]]]]');
    expect(createLineMarker(12, 3)).toBe('[[[12]]](((3)))');
  });

  it('parses the book id marker, also with spaces and full-width brackets', () => {
    expect(parseBookIdMarker('[[[[1700000000000]]]]')).toBe('1700000000000');
    expect(parseBookIdMarker(' [ [ [ [ book-1 ] ] ] ] ')).toBe('book-1');
    expect(parseBookIdMarker('［［［［42］］］］')).toBe('42');
    expect(parseBookIdMarker('[[[12]]](((3)))')).toBeNull();
    expect(parseBookIdMarker('Hello')).toBeNull();
  });

  it('parses line markers, also with spaces and full-width brackets', () => {
    expect(parseLineMarker('[[[12]]](((3)))')).toEqual({
      paragraphId: 12,
      lineIndex: 3,
      trailingText: '',
    });
    expect(parseLineMarker('[[[ 12 ]]] ((( 3 )))')).toEqual({
      paragraphId: 12,
      lineIndex: 3,
      trailingText: '',
    });
    expect(parseLineMarker('【【【12】】】（（（3）））')?.lineIndex).toBe(3);
    expect(parseLineMarker('[[[12]]](((3))) Привет')?.trailingText).toBe('Привет');
    expect(parseLineMarker('[[[[12]]]]')).toBeNull();
    expect(parseLineMarker('Text [[[12]]](((3)))')).toBeNull();
  });
});
