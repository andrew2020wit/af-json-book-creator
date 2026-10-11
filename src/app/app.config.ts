import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // When leaving the editor with the browser's Back button is cancelled, go back to the editor's
    // history entry instead of overwriting the previous one with it.
    provideRouter(routes, withRouterConfig({ canceledNavigationResolution: 'computed' })),
  ],
};
