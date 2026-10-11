import { ZipArchive } from '../archive/zip-archive';

const wordNamespace = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';

/** Reads the text of the Word paragraphs of a DOCX file, in document order. */
export async function readDocxParagraphs(bytes: Uint8Array): Promise<string[]> {
  const zipArchive = await ZipArchive.open(bytes);
  const document = zipArchive.getXmlDocument('word/document.xml');

  return Array.from(document.getElementsByTagNameNS(wordNamespace, 'p'), (paragraphElement) => {
    const parts: string[] = [];

    appendRunText(paragraphElement, parts);

    return parts.join('');
  });
}

function appendRunText(element: Element, parts: string[]): void {
  for (const childElement of Array.from(element.children)) {
    if (childElement.namespaceURI !== wordNamespace) {
      continue;
    }

    switch (childElement.localName) {
      case 't':
        parts.push(childElement.textContent ?? '');
        break;
      case 'tab':
        parts.push('\t');
        break;
      case 'br':
      case 'cr':
        parts.push(' ');
        break;
      case 'p':
        // A nested paragraph (e.g. in a text box) is read as a paragraph of its own.
        break;
      default:
        appendRunText(childElement, parts);
    }
  }
}
