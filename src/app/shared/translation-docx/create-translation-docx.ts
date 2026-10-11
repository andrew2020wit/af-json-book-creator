import { IBook } from '../../../models/book.interface';
import { createBookIdMarker, createLineMarker } from './translation-markers';

export const docxMimeType =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

/**
 * Text of the Word paragraphs of `.to-translate.docx` (spec 4.7): the book id marker, then
 * a line marker and the line text for every line of every paragraph.
 */
export function createTranslationDocxParagraphs(book: IBook): string[] {
  const docxParagraphs = [createBookIdMarker(book.id)];

  for (const paragraph of book.content) {
    for (const [lineIndex, line] of paragraph.text.entries()) {
      docxParagraphs.push(createLineMarker(paragraph.id, lineIndex), line);
    }
  }

  return docxParagraphs;
}

const contentTypesXml =
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
  '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
  '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
  '<Default Extension="xml" ContentType="application/xml"/>' +
  '<Override PartName="/word/document.xml" ' +
  'ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
  '</Types>';

const relationshipsXml =
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
  '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
  '<Relationship Id="rId1" ' +
  'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" ' +
  'Target="word/document.xml"/>' +
  '</Relationships>';

/**
 * Creates `.to-translate.docx`. The document is a minimal OOXML package written by hand:
 * a book has hundreds of thousands of lines, and a general DOCX library is far too slow for that.
 */
export async function createTranslationDocx(book: IBook): Promise<Blob> {
  const { strToU8, zipSync } = await import('fflate');

  const zipBytes = zipSync({
    '[Content_Types].xml': strToU8(contentTypesXml),
    '_rels/.rels': strToU8(relationshipsXml),
    'word/document.xml': strToU8(createDocumentXml(createTranslationDocxParagraphs(book))),
  });

  return new Blob([new Uint8Array(zipBytes)], { type: docxMimeType });
}

function createDocumentXml(docxParagraphs: readonly string[]): string {
  const parts = [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>',
  ];

  for (const docxParagraph of docxParagraphs) {
    parts.push(
      '<w:p><w:r><w:t xml:space="preserve">',
      escapeXmlText(docxParagraph),
      '</w:t></w:r></w:p>',
    );
  }

  parts.push('<w:sectPr/></w:body></w:document>');

  return parts.join('');
}

// Characters that XML 1.0 does not allow at all.
const invalidXmlCharacterPattern = /[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g;

function escapeXmlText(text: string): string {
  return text
    .replace(invalidXmlCharacterPattern, '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
