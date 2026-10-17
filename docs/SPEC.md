# AF JSON Book Creator — Specification

> Status: **approved for MVP implementation**. All MVP decisions are final; open items for later
> stages are listed in section 9.

## 1. Purpose

A web application for creating books in the **JSON Book** format directly in the browser.

JSON Book is a book format for reading in a foreign language in
[Foreign Reader](https://andrew2020wit.github.io/foreign-reader/). Today such books are created by
console scripts from `json-book-utils` (epub → json, txt → json, srt → json, translation
export/import). The application does the same without Node.js or the command line, creates books
from movie subtitles with a translation from native-language subtitles, and also lets the user
edit the title and table of contents of an existing book and import a translation into it.

## 2. JSON Book format

The source of truth is the interfaces in this project's `src/models/` (`book-json.interface.ts`,
`book.interface.ts`):

```ts
export interface IBookJson {
  book: IBook;
  jsonContentDescription?: string;
}

export interface IBook {
  id: string;
  title: string;
  content: IBookParagraph[];
  translation?: Record<string, string>;
  markedItems: IBookParagraph['id'][];
  headers: IBookHeader[];
}

export interface IBookParagraph {
  id: number;
  text: string[]; // paragraph lines
}

export type IBookHeader = {
  id: IBookParagraph['id'];
  text: string;
};
```

Differences from the old model in `json-book-utils`: the book's `description` field and the
header's `isMarked` field were removed; `markedItems` and `headers` are required.

The other interfaces in `src/models/` (`IDB*`, `IMarkForMenu`) belong to Foreign Reader's storage
and menu and are not used by this application.

Key rules:

- `content` is an array of paragraphs; each paragraph is an array of lines `text`.
- `paragraph.id` is the paragraph identifier, **not** its position in the array (ids may have gaps).
- `headers` is the table of contents: references to paragraphs by `id`.
- `jsonContentDescription` is always `"ForeignReaderBook"`.
- A line's translation key is `` `${paragraph.id}-${lineIndex}` ``, `lineIndex` is zero-based. The
  application does not translate by itself; it imports a translation from a translated DOCX
  (see 4.7).
- File extension: `.book.json`.

## 3. Scenarios

1. **Batch conversion.** On the start page, "Import files" → select several `.txt` / `.epub` files →
   each file is converted to a JSON Book, and `.book.json` and `.to-translate.docx` are downloaded
   for each one right away.
2. **Single-file conversion.** "Import files" → select one file → it is converted,
   `.to-translate.docx` is downloaded right away, and the book opens on the editor page → edit the
   title and table of contents → "Save" downloads `.book.json`.
3. **Editing an existing book.** "Edit JSON file" → select one `.book.json` → it opens on the editor
   page → edit → "Save" downloads `.book.json`.
4. **Getting a translation.** The user translates `.to-translate.docx` themselves with the Google
   Translate web service (document translation) and gets the same DOCX, translated. Then either:
   - on the editor page, "Import translation" → select the translated `.docx` → if the book IDs
     match, the translation is added to the open book → "Save"; or
   - on the **Translation** page, select the `.book.json` and the translated `.docx` → if the book
     IDs match, click "Import translation" → the book with the translation opens on the editor page
     → "Save".
5. **Exporting a translation file for an existing book.** On the **Translation** page, select a
   `.book.json` → "Export translation file" downloads its `.to-translate.docx`.
6. **A book from subtitles.** On the start page, "Import subtitles" → the **Import subtitles** page
   → select the original subtitles and, optionally, subtitles in the user's native language →
   "Create book" → the book opens on the editor page → "Save" (see 4.11).

Scenarios for later versions: pasting text without a file.

## 4. Functional requirements

### 4.1. Start page

Three options, each on its own card (two columns on wide screens, one on narrow ones):

| Option               | File selection             | Result                                   |
| -------------------- | -------------------------- | ---------------------------------------- |
| **Import files**     | One or more `.txt`/`.epub` | 1 file → editor page; >1 → download each |
| **Edit JSON file**   | Exactly one `.json`        | Editor page                              |
| **Import subtitles** | — (a link to its own page) | The **Import subtitles** page (4.11)     |

Translation import lives on a separate **Translation** page (see 4.7).

- Files are selected with the standard file-open dialog (`<input type="file">`; for "Import files"
  with `multiple`; an `accept` filter by extension).
- Some browsers (mobile ones especially) ignore the `accept` filter, so the extension is checked
  again after selection; a file with an unsupported extension is an error (in batch mode it is
  skipped and added to the error list).
- All files are processed locally in the browser and never sent anywhere.
- If the only selected file cannot be opened or converted, an error message is shown and the user
  stays on the start page.

Batch mode (more than one file selected):

- files are converted one by one; for each one `.book.json` and `.to-translate.docx` are
  downloaded (see 4.5, 4.7);
- the page shows progress: which file is being processed and how many are done;
- if a file cannot be converted, it is skipped, processing continues, and an error list is shown at
  the end;
- the editor page is not opened.

Single file: after a successful conversion `.to-translate.docx` is downloaded right away (its name
follows the converted book's file name, see 4.5), and the book opens on the editor page.

Note: when several downloads happen in a row, the browser may ask once for permission to download
multiple files automatically. This is normal browser behavior.

### 4.2. TXT conversion

**Encoding:** the file must be UTF-8. If it is not, the application detects the source encoding by
itself and decodes the text into UTF-8 before parsing. The user does not choose the encoding.

Algorithm:

1. a BOM is present → encoding by BOM (UTF-8, UTF-16 LE/BE); the BOM is dropped;
2. otherwise — try strict UTF-8 decoding (`TextDecoder('utf-8', { fatal: true })`);
3. if that fails — detect the encoding automatically with the `jschardet` library (works in the
   browser) and decode the text with the built-in `TextDecoder` in the detected encoding
   (windows-1251, windows-1252, koi8-r, etc.);
4. if the encoding cannot be detected or `TextDecoder` does not support it, the file is treated as
   erroneous (error message; in batch mode the file is skipped).

Detection is heuristic: it may be wrong on short files or rare encodings.

Metadata:

- `id` — the current time in milliseconds (`Date.now()`) as a string; the conversion function
  receives it as a parameter to stay pure and testable;
- `title` — the file name without the extension;
- `markedItems` — an empty array;
- `headers` — an empty array.

The text is split into paragraphs and lines as described in 4.4.

### 4.3. EPUB conversion

The behavior follows `epub-to-json` from `json-book-utils`:

- `title` — `"<author> - <title>"` from the metadata (only the title if there is no author);
- the description from the EPUB metadata is not used (the model has no `description` field);
- `markedItems` — an empty array;
- chapters are taken in spine order; each chapter's HTML is converted to text and split as described
  in 4.4; the paragraphs of all chapters go into a single `content` with continuous `id` numbering;
- for each chapter that is present in the table of contents (NCX / nav), an entry is created in
  `headers` pointing to the chapter's first paragraph; the header text is the chapter title only;
- a header is not created if the chapter produced no paragraphs, if the TOC entry has an empty
  title, or if another header already points to that paragraph (the first one wins) — otherwise the
  rules of the "Headers" section (4.5) would be violated.

Implementation: the Node library `epub` does not work in the browser, so the EPUB (a ZIP archive)
is unpacked with the `fflate` library; `container.xml`, the OPF, NCX/nav and the XHTML chapters are
parsed with the built-in `DOMParser`; HTML is converted to text by our own function (block elements
→ line breaks). The XHTML encoding is taken from the declaration in the file (per the EPUB standard,
UTF-8 or UTF-16).

### 4.4. Text splitting

The logic follows `text-file-to-json-book` (TXT) and `epub-to-json` (EPUB):

- the text is split into paragraphs by line breaks; lines are trimmed (`trim`); empty lines are
  dropped — both in TXT and in EPUB. The result contains no paragraphs without lines (`text: []`);
- a paragraph is split into lines by separators (`. `, `! `, `? `, `; `, `:`, `…`, closing quotes
  followed by a space, etc.); the separator stays at the end of the line;
- paragraph `id`s are sequential, starting from zero.

There are no splitting settings in the MVP: the defaults from `json-book-utils` are used (the
separator list from `text-split-separators.const.ts`).

Difference from `epub-to-json`: with the `skip*EmptyParagraph` flags off, the script turns empty
EPUB lines into `{ id, text: [] }` paragraphs; the application drops such lines, so the `skip*`
flags are not needed.

### 4.5. Editor page

**Only** these are editable:

- `title`;
- `headers` — the "Headers" section (see below);
- `markedItems` (bookmarks) — only deleting all bookmarks with the **Delete all bookmarks** button;
  viewing or editing individual bookmarks is not supported. The button asks for confirmation and
  sets `markedItems` to an empty array.

#### "Headers" section

The section is a list of headers. Each list item has two editable fields:

- **Paragraph ID** — a number, the `id` of the paragraph the header belongs to (`IBookHeader.id`);
- **Title** — the header title (`IBookHeader.text`).

User actions:

- change a header's Paragraph ID;
- change a header's Title;
- delete a header;
- add a header;
- **Delete all headers** — delete all headers.

Constraint: two different headers cannot point to the same paragraph (Paragraph ID is unique in the
list).

Details:

- Paragraph ID must be an integer and match the `id` of an existing paragraph in `content`.
- Title cannot be empty (after `trim`).
- Errors (non-existent paragraph, duplicate Paragraph ID, empty Title) are shown next to the
  corresponding field as the user types; while there are errors, Save is disabled.
- A new header is added at the end of the list with empty fields.
- "Delete all headers" asks for confirmation.

Sorting:

- Headers are always sorted by Paragraph ID in ascending order — both in the list on the page and in
  the saved file.
- The list is re-sorted when the user has finished editing a Paragraph ID (the field loses focus or
  Enter is pressed), not on every keystroke. If the order is already correct, nothing happens.
- Headers without a number in Paragraph ID (for example, one just added) stay at the end of the
  list.
- If a row moves, focus stays on the element the user moved it to (for example, the Title field of
  the same row), and a screen reader announcement reports the move.

The book content (`content`) is not editable and will not be. `content` and `translation` are kept
unchanged; `markedItems` is kept unchanged unless "Delete all bookmarks" is pressed.

Legacy fields — fields that are not in the model (for example, the book's `description` and the
headers' `isMarked` in files created by the old `json-book-utils` scripts) — are kept as is on save,
as long as they do not conflict with the model:

- such fields are not shown and not editable;
- a header's legacy fields stay with it when its Paragraph ID or Title changes, and are removed
  together with the header; new headers have none;
- "Delete all headers" removes the headers together with their legacy fields;
- a conflict is a model field with a wrong type (for example, `headers` is not an array): such a
  file is not opened (see 4.6) rather than silently fixed.

TXT and EPUB conversion does not create legacy fields.

The **Save** button validates the data and downloads the updated `.book.json` through the browser's
download mechanism. It does not download a translation file: `.to-translate.docx` is downloaded on
import of a single file (4.1) and can be exported on the Translation page (4.7).

The **Import translation** button opens the file dialog for a translated `.to-translate.docx`
(spec 4.7): if the book ID in the DOCX matches the book's ID, the translation replaces the
book's translation in memory (an unsaved change) and a summary is shown; otherwise an error is shown
and nothing changes. The page shows how many lines have a translation.

- Format: JSON indented with 2 spaces (`JSON.stringify(bookJson, null, 2)`).
- `jsonContentDescription` is set to `"ForeignReaderBook"` on save.
- Validation before saving: non-empty `title`, valid headers (see "Headers").
- File name:
  - for a converted file — the normalized source file name (like `normalizeFileName` in
    `json-book-utils`) + `.book.json`;
  - for an opened JSON (via "Edit JSON file" or the Translation page) — the opened file's name,
    unchanged;
  - in batch mode — as for a converted file;
  - the translation file — the same name, with the `.book.json` ending (or just `.json` if the file
    is named differently) replaced by `.to-translate.docx`.

The **Back** button returns to the start page without saving (with a confirmation if there are
unsaved changes, see 4.10).

On the editor page the book ID is not shown and cannot be changed: it stays as it was created on
conversion or as it is in the opened file, so exported `.to-translate.docx` files always match the
book.

### 4.6. Opening JSON

- The file is read as UTF-8 and parsed with `JSON.parse`.
- The structure is checked: `book` exists; its `id` and `title` are strings; `content` is an array
  of paragraphs `{ id: number, text: string[] }`; `headers` is an array of
  `{ id: number, text: string }`; `markedItems` is an array of numbers; `translation` (if present)
  is an object with string values.
- `paragraph.id` values are unique within `content`; a duplicate is an error (headers and
  translation keys refer to a paragraph by `id`).
- Missing `headers` and `markedItems` (old files) are replaced with empty arrays.
- An empty `title` is not an opening error: the book opens, but Save is disabled until the title is
  filled in.
- On a parse or structure error, a clear message is shown on the page where the file was selected
  (start or Translation), and the editor page is not opened.

### 4.7. Translation via DOCX

Follows the `export-to-translation-for-json-book` / `create-docx-to-translate` and
`import-translation` scripts from `json-book-utils`, with one difference: the translation is
imported directly from the DOCX rather than from the `1.txt` text file.

The application does not translate by itself and does not call external services. The user
translates the DOCX themselves with the Google Translate web service (document translation). There
is no manual editing of the translation in the application.

The format is DOCX (Office Open XML) specifically; the old binary `.doc` is not supported.

#### Export: the `.to-translate.docx` file

Downloaded:

- right after a single file is imported on the start page (4.1);
- for every file in batch mode (4.1);
- with the **Export translation file** button on the Translation page, for the selected `.book.json`.

It is not downloaded on Save. The document structure is a sequence of Word paragraphs:

1. the first paragraph is the book ID: `[[[[<book.id>]]]]`;
2. for each line of each book paragraph, in order — two Word paragraphs:
   - the line marker: `[[[<paragraph.id>]]](((<lineIndex>)))`;
   - the line text.

The markers match the script, so DOCX files created by the script and by the application are
interchangeable.

Difference from the script: the marker contains `paragraph.id`, not the paragraph's position in
`content`. The script uses the position, and if paragraph `id`s are not sequential from zero, the
translation keys will not match the keys Foreign Reader expects (`` `${paragraph.id}-${lineIndex}` ``).
For books with `id`s sequential from zero the result is the same.

DOCX is created in the browser as a minimal OOXML package (`[Content_Types].xml`, `_rels/.rels`,
`word/document.xml`) written by hand and zipped with `fflate`. The `docx` library used by the script
was tried first, but it took more than 45 seconds for a book of 250,000 lines; the hand-written
package takes under a second.

#### Import

A translation can be imported in two places with the same parsing rules (below):

- on the editor page — into the open book (4.5);
- on the Translation page — into a selected `.book.json`.

#### The "Translation" page

A separate page for exporting and importing a translation. It has two file inputs and two buttons:

1. **JSON file** — a `.book.json`. The file is opened and validated as in 4.6; on error, a message
   is shown next to the input. Once a valid JSON is selected, the **Export translation file**
   button downloads its `.to-translate.docx` (named after the JSON file, see 4.5).
2. **Translated DOCX** — the translated `.docx`. The DOCX is unpacked (`fflate`) and the text of the
   Word paragraphs is extracted in order from `word/document.xml` (`DOMParser`). The first paragraph
   contains the book ID `[[[[...]]]]`; if it is missing, a message is shown next to the input.
   Usually the user selects the JSON first and then the DOCX, but the order is not enforced: both
   inputs are available right away.
3. When both files are selected, the application compares the ID from the DOCX with `book.id` and
   shows the result: match or mismatch ("translation of a different book").
4. The **Import translation** button is enabled only when the IDs match. If the user replaces either
   file, the check runs again.

When "Import translation" is clicked, the translation is parsed as follows:

1. As in the script: pairs of "line marker → next paragraph with the translation". Paragraphs
   without a marker are skipped; an empty translation creates no key; if a marker is immediately
   followed by another marker, parsing moves on to it.
2. The marker `[[[<p>]]](((<l>)))` produces the key `` `${p}-${l}` ``; the value is the translation
   text after `trim`.
3. The result is written to `book.translation`; any existing translation is fully replaced.

Robustness to Google Translate: the translator may insert spaces inside markers or replace brackets
with typographic ones. Markers are found with a regular expression that tolerates spaces; keys that
do not point to an existing book line are skipped.

After the import the user sees a summary: how many lines the book has, how many lines received a
translation, how many markers were skipped.

What happens next on the Translation page: the book with the translation opens on the editor page
(4.5). From there it is saved with the Save button, which downloads `.book.json` (now with the
translation). The file name is the name of the JSON selected on the Translation page.

On the editor page the translation replaces the open book's translation, the summary is shown on the
page, and the book becomes unsaved until Save.

An existing translation in a book is kept as is during editing (4.5).

### 4.8. State storage

- The book and all state of working with it live in memory only (signals). The book is not stored in
  IndexedDB, localStorage, etc.; unsaved changes are lost when the page is reloaded.
- One open book at a time.
- The editor page is not available without an open book: the user is automatically redirected to the
  start page. Typical cases:
  - the user reloaded the page while on `/editor` — the in-memory data is gone, but the route
    remains;
  - the user opened `/editor` directly (address bar, bookmark, browser history, back/forward
    buttons).

  Implementation: a guard on the `/editor` route (`CanActivateFn`): no book in `book-store` →
  redirect to `/` (`replaceUrl`, so `/editor` does not stay in the history). No error message is
  shown.

- When the tab is closed or reloaded with unsaved changes, the browser shows its standard warning
  (`beforeunload`).
- The only exception is the selected theme: it is stored in `localStorage` (see 4.9).

### 4.9. Settings page

A separate **Settings** page. In the MVP it has one setting — the color theme:

- options **System** / **Light** / **Dark** (Material `mat-button-toggle-group` or
  `mat-radio-group`); **System** follows the OS setting (`prefers-color-scheme`) and switches along
  with it;
- the default is **System**;
- the theme is applied immediately, without a save button;
- the choice is stored in `localStorage` and restored after a page reload. If `localStorage` is
  unavailable (private mode, site data blocked), System is used without errors.

### 4.10. Navigation

- A shared top bar (Material `mat-toolbar`) on all pages with links: start page, Translation,
  Settings.
- There is no link to the editor page in the bar. It is reached only by opening a book:
  - "Edit JSON file" on the start page;
  - "Import files" on the start page with one file selected;
  - "Import translation" on the Translation page (see 4.7);
  - "Create book" on the Import subtitles page (see 4.11).
- The Import subtitles page has no link in the bar either: it is reached from its card on the start
  page.
- Leaving the editor page (via the bar or Back) closes the book and discards everything unsaved from
  memory; the book can be returned to only by opening the file again.
- If there are unsaved changes, a confirmation dialog (`MatDialog`) is shown before leaving:
  confirm — leave and lose the changes; cancel — stay on the page. No changes — leave without a
  dialog. Closing or reloading the tab is still handled by `beforeunload` (4.8).
- "Unsaved changes" means any change of the title, headers, deleting bookmarks, and also an
  imported but not yet saved translation — since the book was opened or last saved. A book just
  converted from TXT/EPUB or created from subtitles also counts as unsaved until its first Save.
- On narrow screens the bar links collapse behind a menu button that expands them in place, inside
  the header (a disclosure). An overlay `mat-menu` was tried first, but its items are rendered
  outside the page landmarks and fail the AXE "region" check.
- The current page is marked in the bar (`aria-current="page"`).

### 4.11. Subtitle import

A separate **Import subtitles** page (`/subtitles`), opened from its card on the start page. It
creates a book for reading a movie's subtitles with a translation.

#### The page

1. **Original subtitles** (required) — subtitles in the language of the movie.
2. **Translation subtitles** (optional) — subtitles in the user's native language. A selected file
   can be removed.
3. The **Create book** button is enabled once valid original subtitles are selected.

Each file is read right after it is selected; the page shows its name and the number of subtitles,
or an error next to the input (unsupported extension, no subtitles found, undetectable encoding).

#### Formats

| Format                      | Extension      | Parser                                   |
| --------------------------- | -------------- | ---------------------------------------- |
| SubRip                      | `.srt`         | own                                      |
| WebVTT                      | `.vtt`         | `webvtt-parser`, as in `af-video-player` |
| (Advanced) SubStation Alpha | `.ass`, `.ssa` | own: `Dialogue:` lines of `[Events]`     |
| YouTube SubViewer           | `.sbv`         | own                                      |

- The format is chosen by the file extension.
- The encoding is detected as for TXT (4.2).
- Only plain text is taken from subtitles: HTML-like tags (`<i>`, `<font color="…">`, WebVTT
  `<c.yellow>`, `<v Bob>`, inline timestamps), ASS override blocks (`{\an8}`, `{\i1}`) are removed,
  HTML entities (`&amp;`, `&#39;`) are decoded; in ASS, `\N`/`\n` become line breaks and `\h` a
  space.
- Subtitles without text after cleanup are dropped.
- SRT, ASS/SSA and SBV subtitles are ordered by start time (ASS events may come in any order);
  WebVTT subtitles keep the order of the file, as in the player.
- SRT parsing tolerates a dot instead of the comma, missing hours, short fractions and missing cue
  numbers.

#### The book

- One subtitle = one paragraph with one line: `<timestamp> <text>`. A multi-line subtitle is joined
  into one line with spaces.
- The timestamp is the subtitle's start time as `hh:mm:ss`; when the hours are zero, as `mm:ss`
  (seconds are rounded down).
- Paragraph `id`s are sequential from zero.
- `id` — the current time (as in 4.2); `title` — the original subtitle file name without the
  extension; `markedItems` and `headers` — empty arrays.
- File name — as for a converted file (4.5), from the original subtitle file name.

#### Translation

Translation subtitles are matched to the original ones with the algorithm of `af-video-player`
(`Subtitles.allSubtitles`): both lists are walked in order, and every translation subtitle not taken
yet that starts no later than the original subtitle ends goes to that original subtitle. So a
translation subtitle goes to the first original subtitle that ends after (or when) it starts;
translation subtitles that start after the last original one ends are dropped.

Differences from the player:

- the texts of several translation subtitles matched to one original are joined with a space (the
  player joins them without a separator);
- a translation subtitle that starts at 0 ms is matched too (the player treats a zero start time as
  "no subtitle" and then matches nothing at all).

The matched text becomes the translation of the paragraph's line (key `` `${paragraph.id}-0` ``). A
paragraph without matched translation subtitles gets no key; without translation subtitles the book
has no `translation`.

#### After "Create book"

- With translation subtitles: the book opens on the editor page with a summary ("N of M lines have a
  translation").
- Without them: the book's `.to-translate.docx` is downloaded right away (as for a single imported
  file, 4.1), and the book opens on the editor page.
- The book is unsaved until Save (4.10).

## 5. Non-functional requirements

- **Client only.** No backend. No publishing or deployment is set up: the application runs locally
  (`ng serve` / `ng build`).
- **Stack:** Angular 22 (standalone, signals, zoneless), TypeScript strict.
- **Development rules:** all code follows `AGENTS.md`. For this project this means:
  - TypeScript strict, no `any` (for data of unknown shape, such as an opened JSON, use `unknown`
    with type checks);
  - standalone components only, without `standalone: true` and without an explicit
    `ChangeDetectionStrategy.OnPush` (both are the default in Angular 22);
  - state in signals, derived values via `computed()` / `linkedSignal()`, no `mutate`;
  - small single-responsibility components; `input()` / `output()` / `model()` instead of
    decorators; host bindings in the `host` object, no `@HostBinding` / `@HostListener`;
  - the editor form (Title, header list with validation) uses Signal Forms
    (`@angular/forms/signals`) with a validation schema;
  - templates use built-in control flow (`@if`, `@for`, `@switch`), `class` / `style` bindings
    instead of `ngClass` / `ngStyle`, no `CommonModule`, no access to globals from templates;
  - services use `@Service` (Angular 22) for singletons, dependencies via `inject()`;
  - page routes are lazy-loaded;
  - static images (if any) use `NgOptimizedImage`.
- **UI library:** the UI is built with Angular Material components (`@angular/material`, already
  installed in the project) and Angular CDK. Custom components are written only where Material has
  nothing suitable. For example:
  - buttons — `mat-button` / `mat-icon-button`;
  - Title and Paragraph ID fields — `mat-form-field` + `matInput`, errors — `mat-error`;
  - confirmations ("Delete all headers", "Delete all bookmarks", leaving the editor with unsaved
    changes) — `MatDialog`;
  - batch conversion progress — `mat-progress-bar`;
  - short messages (file open error, etc.) — `MatSnackBar`.
- **Theme:** Material light and dark themes, selected on the Settings page (see 4.9).
- **Performance:** a book of ~50,000 paragraphs converts and saves without a long UI freeze.
  Measured on a 5 MB TXT with 50,000 paragraphs / 250,000 lines: conversion about 0.8 s, Save about
  0.8 s, so a Web Worker is not needed.
- **Bundle size:** heavy libraries (`jschardet`, `fflate`, `webvtt-parser`) are loaded lazily with a dynamic
  `import()` only when needed, so the initial bundle stays within the `angular.json` budgets.
- **Accessibility (from `AGENTS.md`):** all AXE checks pass; WCAG AA minimums are met: contrast,
  focus management (after page navigation, opening/closing dialogs, re-sorting headers), keyboard
  operation, ARIA attributes and labels on all fields and buttons.
- **UI language:** English, no i18n.
- **Compatibility:** latest Chrome, Firefox, Edge and Safari — on desktop and in mobile browsers
  (Chrome for Android, Safari for iOS).
- **Mobile devices and small screens:** all scenarios (import, batch conversion, editing, Save,
  translation import, settings) work on a phone.
  - Responsive layout from 320 px width with no horizontal page scrolling; a header row
    (Paragraph ID + Title + delete) wraps on narrow screens instead of being cut off.
  - Touch-friendly controls: hit area of at least 44×44 px.
  - Files are selected via the mobile browser's system dialog; downloads go through the browser's
    standard download mechanism. On iOS, several downloads in a row in batch mode may be limited —
    verify on a real device.
  - The Paragraph ID field opens a numeric keyboard (`inputmode="numeric"`).
  - The on-screen keyboard does not cover the field being edited.
- **Tests:** unit tests (Vitest) for encoding detection, text splitting, TXT, EPUB and JSON parsing,
  pre-save validation, and creating and parsing the translation DOCX, including:
  - edge cases: gaps in paragraph ids, legacy fields, wrong encodings, empty EPUB chapters, mangled
    markers;
  - a round trip: create DOCX → read its paragraphs → parse the translation;
  - EPUB 2 (NCX) and EPUB 3 (nav) structures; test EPUB and DOCX files are built in the tests with
    `fflate.zipSync`, small fixtures live in `src/testing/`;
  - the editor guards (`TestBed` + router);
  - subtitle parsing (SRT, WebVTT, ASS/SSA, SBV, markup removal), matching translation subtitles,
    timestamps and creating a book from subtitles.

## 6. Architecture (draft)

```
src/
  models/          — IBookJson, IBook, ... (format interfaces, kept in sync with Foreign Reader)
  app/
    core/
      book-store/  — the open book in memory (signals), an `@Service`; editor route guards
      book-files/  — opening, converting and downloading book and translation files
      confirm-dialog/ — the reusable confirmation dialog
      layout/      — the shared top navigation bar
      theme/       — applying the theme, reading/writing the choice in localStorage
    features/
      start/       — start page: Import files, Edit JSON file, batch conversion
      editor/      — editor page: title, headers, bookmarks, translation import, Save
      translation/ — Translation page: translation file export, DOCX selection, ID check, import
      subtitles/   — Import subtitles page: original and translation subtitles, Create book
      settings/    — Settings page: theme (System / Light / Dark, localStorage)
    shared/
      archive/          — ZIP and XML helpers over `fflate` and `DOMParser`
      conversion/       — pure functions: encoding, text splitting, TXT → book, EPUB → book
      book-json/        — JSON parsing and validation, serialization, file names
      translation-docx/ — creating .to-translate.docx, parsing a translated DOCX → translation
      subtitles/        — subtitle parsing, translation matching, subtitles → book
      download/         — downloading a file through the browser
      ui/               — shared UI pieces: file picker button, file error list
  testing/         — test fixtures
```

Routes (lazy-loaded):

- `/` — start page;
- `/editor` — editor page;
- `/translation` — translation import page;
- `/subtitles` — subtitle import page;
- `/settings` — settings page.

Conversion, parsing and validation are pure functions without Angular dependencies, so they are easy
to test and could be reused in `json-book-utils`.

## 7. Stages

1. **MVP:** start page (Import files, Edit JSON file), `.txt` and `.epub` conversion, batch
   download, editor page for the title, headers, bookmarks and translation import, Save
   (`.book.json`), Translation page (translation file export and import), Settings page (theme).
2. **More sources:** subtitles (`.srt`, `.vtt`, `.ass`, `.ssa`, `.sbv`, done, see 4.11); pasting text.

## 8. Out of scope

- Editing the book content (`content`).
- Reading books (that is Foreign Reader's job).
- Automatic machine translation and calling translation services (the user translates the DOCX
  themselves).
- Manual translation editing; the old `.doc` format.
- Accounts, sync, server storage, publishing the application.
- Keeping the book across page reloads (only the theme is kept).
- Full-text search in the book, undo/redo (in the MVP).
- UI localization.

## 9. Open questions

MVP — none.

Deferred to later stages — none. (Resolved: one subtitle = one paragraph with one line, see 4.11.)
