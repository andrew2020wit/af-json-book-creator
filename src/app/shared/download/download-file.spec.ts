import { downloadFile } from './download-file';

describe('downloadFile', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('clicks a temporary download link and revokes the object URL later', () => {
    vi.useFakeTimers();

    const createObjectUrlSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test');
    const revokeObjectUrlSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const clickedAnchors: HTMLAnchorElement[] = [];

    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      clickedAnchors.push(this);
    });

    const blob = new Blob(['{}'], { type: 'application/json' });

    downloadFile(document, blob, 'book.book.json');

    expect(createObjectUrlSpy).toHaveBeenCalledWith(blob);
    expect(clickedAnchors).toHaveLength(1);
    expect(clickedAnchors[0].download).toBe('book.book.json');
    expect(clickedAnchors[0].href).toBe('blob:test');
    expect(document.body.contains(clickedAnchors[0])).toBe(false);
    expect(revokeObjectUrlSpy).not.toHaveBeenCalled();

    vi.runAllTimers();

    expect(revokeObjectUrlSpy).toHaveBeenCalledWith('blob:test');
  });
});
