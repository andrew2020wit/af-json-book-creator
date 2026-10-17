import { clearMarkup } from './clear-markup';

describe('clearMarkup', () => {
  it('removes tags and ASS override blocks', () => {
    expect(clearMarkup('{\\an8}<font color="red"><i>Hi</i></font> <00:01.000>there')).toBe(
      'Hi there',
    );
  });

  it('decodes named and numeric entities and keeps unknown ones', () => {
    expect(clearMarkup('a &amp; b &lt;c&gt; &#39;d&#x27; &unknown;')).toBe(
      "a & b <c> 'd' &unknown;",
    );
  });
});
