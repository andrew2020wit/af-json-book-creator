/** Some browsers cancel the download if the object URL is revoked right after the click. */
const revokeDelayMs = 60_000;

/** Saves a file through the browser's download mechanism. */
export function downloadFile(document: Document, blob: Blob, fileName: string): void {
  const objectUrl = URL.createObjectURL(blob);
  const anchorElement = document.createElement('a');

  anchorElement.href = objectUrl;
  anchorElement.download = fileName;
  anchorElement.style.display = 'none';
  document.body.append(anchorElement);
  anchorElement.click();
  anchorElement.remove();

  setTimeout(() => URL.revokeObjectURL(objectUrl), revokeDelayMs);
}
