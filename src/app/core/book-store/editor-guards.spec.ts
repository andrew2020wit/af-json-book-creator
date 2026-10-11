import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { BookStore } from './book-store';
import { editorGuard, LeaveConfirmation, unsavedChangesGuard } from './editor-guards';

@Component({ template: 'start' })
class TestStartPage {}

@Component({ template: 'editor' })
class TestEditorPage implements LeaveConfirmation {
  static canLeave = true;

  confirmLeave(): boolean {
    return TestEditorPage.canLeave;
  }
}

describe('editor guards', () => {
  beforeEach(() => {
    TestEditorPage.canLeave = true;
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: TestStartPage },
          {
            path: 'editor',
            component: TestEditorPage,
            canActivate: [editorGuard],
            canDeactivate: [unsavedChangesGuard],
          },
        ]),
      ],
    });
  });

  function openBook(): void {
    TestBed.inject(BookStore).open({
      bookJson: {
        book: { id: '1', title: 't', content: [], markedItems: [], headers: [] },
      },
      fileName: 'book.book.json',
      isSaved: true,
    });
  }

  it('redirects from the editor to the start page when no book is open', async () => {
    const routerTestingHarness = await RouterTestingHarness.create();

    await routerTestingHarness.navigateByUrl('/editor');

    expect(TestBed.inject(Router).url).toBe('/');
  });

  it('opens the editor when a book is open', async () => {
    openBook();

    const routerTestingHarness = await RouterTestingHarness.create();

    await routerTestingHarness.navigateByUrl('/editor', TestEditorPage);

    expect(TestBed.inject(Router).url).toBe('/editor');
  });

  it('stays on the editor when the page refuses to be left', async () => {
    openBook();

    const routerTestingHarness = await RouterTestingHarness.create();

    await routerTestingHarness.navigateByUrl('/editor', TestEditorPage);
    TestEditorPage.canLeave = false;
    await routerTestingHarness.navigateByUrl('/');

    expect(TestBed.inject(Router).url).toBe('/editor');

    TestEditorPage.canLeave = true;
    await routerTestingHarness.navigateByUrl('/');

    expect(TestBed.inject(Router).url).toBe('/');
  });
});
