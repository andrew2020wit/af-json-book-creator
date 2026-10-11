# AF JSON Book Creator

A browser app for creating books in the **JSON Book** format used by
[Foreign Reader](https://andrew2020wit.github.io/foreign-reader/). It does what the
`json-book-utils` scripts do, without Node.js or the command line. All files are processed locally in
the browser and never uploaded.

- **Import files** — convert `.txt` (any encoding, detected automatically) and `.epub` files into
  `.book.json`. One file opens in the editor and its `<name>.to-translate.docx` is downloaded;
  several files are converted and downloaded (`.book.json` + `.to-translate.docx`) at once.
- **Edit JSON file** — change the title and headers (table of contents) of an existing book,
  delete all its bookmarks, or import a translation into it.
- **Save** — downloads `<name>.book.json`.
- **Translation** — export `.to-translate.docx` for a book, translate it with the document
  translation of Google Translate, then import the translated DOCX back (here or in the editor).
- **Settings** — System / Light / Dark theme.

See [docs/SPEC.md](docs/SPEC.md) for the specification.

## Development

Install dependencies:

```bash
npm install
```

Start a local development server at `http://localhost:4200/`:

```bash
npm start
```

Build the app into `dist/`:

```bash
npm run build
```

Run the unit tests with [Vitest](https://vitest.dev/):

```bash
npm test
```

## Project structure

- `src/models/` — JSON Book interfaces, kept in sync with Foreign Reader.
- `src/app/shared/` — pure functions without Angular: text splitting, encoding detection, TXT and
  EPUB conversion, JSON parsing and validation, translation DOCX export and import.
- `src/app/core/` — app-wide services and UI: open book state, guards, theme, top bar, dialogs.
- `src/app/features/` — pages: start, editor, translation, settings.
