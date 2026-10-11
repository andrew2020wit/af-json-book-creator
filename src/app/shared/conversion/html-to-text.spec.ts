import { htmlToText } from './html-to-text';

function parseXhtml(body: string): Document {
  return new DOMParser().parseFromString(
    `<?xml version="1.0" encoding="utf-8"?>
    <html xmlns="http://www.w3.org/1999/xhtml"><head><title>Ignored</title></head>
    <body>${body}</body></html>`,
    'application/xhtml+xml',
  );
}

describe('htmlToText', () => {
  it('turns block elements and br into line breaks and keeps inline text together', () => {
    const document = parseXhtml(
      '<h1>Chapter 1</h1><p>It was a <em>cold</em>\n   morning.</p><p>Line one<br/>Line two</p>',
    );

    const lines = htmlToText(document)
      .split('\n')
      .filter((line) => line.length > 0);

    expect(lines).toEqual(['Chapter 1', 'It was a cold morning.', 'Line one', 'Line two']);
  });

  it('skips head, script and style content', () => {
    const document = parseXhtml(
      '<style>p { color: red; }</style><script>var x;</script><p>Text</p>',
    );

    expect(htmlToText(document).trim()).toBe('Text');
  });
});
