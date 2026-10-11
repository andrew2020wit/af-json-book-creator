import { encodeLatin1, encodeUtf16Le, encodeWindows1251 } from '../../../testing/legacy-encodings';
import { decodeText, TextDecodingError } from './decode-text';

const russianText =
  'Это был холодный зимний вечер. Старик медленно шёл по пустой улице, ' +
  'и снег тихо падал на его плечи. Он думал о своём доме, о тёплой печи и о книгах, ' +
  'которые ждали его на полке. Никто не встретился ему на пути.';

const frenchText =
  "C'était une soirée d'hiver très froide. Le vieil homme marchait lentement dans la rue " +
  'déserte, et la neige tombait doucement sur ses épaules. Il pensait à sa maison, à ' +
  "la cheminée et aux livres qui l'attendaient. Où était-il allé ? Personne ne le savait.";

describe('decodeText', () => {
  it('decodes UTF-8 without a BOM', async () => {
    expect(await decodeText(new TextEncoder().encode(russianText))).toBe(russianText);
  });

  it('decodes UTF-8 with a BOM and drops the BOM', async () => {
    const bytes = Uint8Array.from([0xef, 0xbb, 0xbf, ...new TextEncoder().encode('Hello')]);

    expect(await decodeText(bytes)).toBe('Hello');
  });

  it('decodes UTF-16 LE with a BOM', async () => {
    expect(await decodeText(encodeUtf16Le(russianText, true))).toBe(russianText);
  });

  it('detects and decodes windows-1251', async () => {
    expect(await decodeText(encodeWindows1251(russianText))).toBe(russianText);
  });

  it('detects and decodes a Western single-byte encoding', async () => {
    expect(await decodeText(encodeLatin1(frenchText))).toBe(frenchText);
  });

  it('throws TextDecodingError when the encoding cannot be detected', async () => {
    const bytes = Uint8Array.from([0x00, 0xff, 0x00, 0xfe, 0x81, 0x00]);

    await expect(decodeText(bytes)).rejects.toBeInstanceOf(TextDecodingError);
  });
});
