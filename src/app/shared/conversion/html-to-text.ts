const blockElementNames = new Set([
  'address',
  'article',
  'aside',
  'blockquote',
  'caption',
  'dd',
  'div',
  'dl',
  'dt',
  'figcaption',
  'figure',
  'footer',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'li',
  'main',
  'nav',
  'ol',
  'p',
  'pre',
  'section',
  'table',
  'td',
  'th',
  'tr',
  'ul',
]);

const skippedElementNames = new Set(['head', 'script', 'style', 'template', 'title']);

/**
 * Converts an HTML/XHTML node into plain text: block elements and `<br>` become line breaks,
 * whitespace inside text is collapsed (like `html-to-text` with `preserveNewlines: false`).
 */
export function htmlToText(rootNode: Node): string {
  const parts: string[] = [];

  appendNodeText(rootNode, parts);

  return parts
    .join('')
    .split('\n')
    .map((line) => line.trim())
    .join('\n');
}

function appendNodeText(node: Node, parts: string[]): void {
  if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.CDATA_SECTION_NODE) {
    parts.push((node.nodeValue ?? '').replace(/\s+/g, ' '));

    return;
  }

  if (node.nodeType !== Node.ELEMENT_NODE && node.nodeType !== Node.DOCUMENT_NODE) {
    return;
  }

  const elementName = node.nodeType === Node.ELEMENT_NODE ? (node as Element).localName : '';

  if (skippedElementNames.has(elementName)) {
    return;
  }

  if (elementName === 'br') {
    parts.push('\n');

    return;
  }

  const isBlock = blockElementNames.has(elementName);

  if (isBlock) {
    parts.push('\n');
  }

  for (const childNode of Array.from(node.childNodes)) {
    appendNodeText(childNode, parts);
  }

  if (isBlock) {
    parts.push('\n');
  }
}
