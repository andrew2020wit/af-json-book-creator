import { zipSync } from 'fflate';
import { resolveArchivePath, ZipArchive, ZipArchiveError } from './zip-archive';

describe('ZipArchive', () => {
  it('reads entries by exact and case-insensitive path', async () => {
    const zipArchive = await ZipArchive.open(
      zipSync({ 'OEBPS/Content.opf': new TextEncoder().encode('<a/>') }),
    );

    expect(zipArchive.getEntry('OEBPS/Content.opf')).not.toBeNull();
    expect(zipArchive.getEntry('oebps/content.opf')).not.toBeNull();
    expect(zipArchive.getEntry('missing.xml')).toBeNull();
  });

  it('parses XML entries and rejects invalid XML', async () => {
    const zipArchive = await ZipArchive.open(
      zipSync({
        'good.xml': new TextEncoder().encode('<root><item/></root>'),
        'bad.xml': new TextEncoder().encode('<root><item></root>'),
      }),
    );

    expect(zipArchive.getXmlDocument('good.xml').documentElement.localName).toBe('root');
    expect(() => zipArchive.getXmlDocument('bad.xml')).toThrow(ZipArchiveError);
    expect(() => zipArchive.getXmlDocument('missing.xml')).toThrow(ZipArchiveError);
  });

  it('rejects a file that is not a ZIP archive', async () => {
    await expect(ZipArchive.open(new TextEncoder().encode('not a zip'))).rejects.toBeInstanceOf(
      ZipArchiveError,
    );
  });
});

describe('resolveArchivePath', () => {
  it('resolves relative hrefs and drops fragments', () => {
    expect(resolveArchivePath('OEBPS/content.opf', 'text/ch%201.xhtml#start')).toBe(
      'OEBPS/text/ch 1.xhtml',
    );
    expect(resolveArchivePath('OEBPS/toc/nav.xhtml', '../text/ch1.xhtml')).toBe(
      'OEBPS/text/ch1.xhtml',
    );
    expect(resolveArchivePath('content.opf', 'ch1.xhtml')).toBe('ch1.xhtml');
  });
});
