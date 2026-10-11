import { Routes } from '@angular/router';
import { editorGuard, unsavedChangesGuard } from './core/book-store/editor-guards';

const appName = 'JSON Book Creator';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: appName,
    loadComponent: () => import('./features/start/start-page').then((module) => module.StartPage),
  },
  {
    path: 'editor',
    title: `Edit book · ${appName}`,
    canActivate: [editorGuard],
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () =>
      import('./features/editor/editor-page').then((module) => module.EditorPage),
  },
  {
    path: 'translation',
    title: `Translation · ${appName}`,
    loadComponent: () =>
      import('./features/translation/translation-page').then((module) => module.TranslationPage),
  },
  {
    path: 'settings',
    title: `Settings · ${appName}`,
    loadComponent: () =>
      import('./features/settings/settings-page').then((module) => module.SettingsPage),
  },
  { path: '**', redirectTo: '' },
];
