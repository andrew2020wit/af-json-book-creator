import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, RedirectCommand, Router } from '@angular/router';
import { BookStore } from './book-store';

/**
 * The editor page needs an open book. Without one (page reload, direct link) it redirects
 * to the start page and replaces `/editor` in the history (spec 4.8).
 */
export const editorGuard: CanActivateFn = () => {
  if (inject(BookStore).openBook()) {
    return true;
  }

  return new RedirectCommand(inject(Router).parseUrl('/'), { replaceUrl: true });
};

export interface LeaveConfirmation {
  /** Resolves to `true` when the page may be left (no unsaved changes, or the user confirmed). */
  confirmLeave(): boolean | Promise<boolean>;
}

/** Asks the page whether it may be left (spec 4.10). */
export const unsavedChangesGuard: CanDeactivateFn<LeaveConfirmation> = (component) =>
  component.confirmLeave();
