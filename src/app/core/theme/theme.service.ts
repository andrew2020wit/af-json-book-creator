import { DOCUMENT, effect, inject, Service, signal } from '@angular/core';

export type ThemePreference = 'system' | 'light' | 'dark';

export const themeStorageKey = 'af-json-book-creator.theme';

const colorSchemeByPreference: Record<ThemePreference, string> = {
  system: 'light dark',
  light: 'light',
  dark: 'dark',
};

/**
 * Applies the color theme (spec 4.9). The choice is the only state kept in `localStorage`;
 * when storage is unavailable the theme silently falls back to `system`.
 */
@Service()
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly themePreference = signal<ThemePreference>(this.readStoredPreference());

  constructor() {
    effect(() => {
      const themePreference = this.themePreference();

      // Material's theme uses light-dark(), which follows the color-scheme property.
      this.document.documentElement.style.colorScheme = colorSchemeByPreference[themePreference];
      this.writeStoredPreference(themePreference);
    });
  }

  setThemePreference(themePreference: ThemePreference): void {
    this.themePreference.set(themePreference);
  }

  private readStoredPreference(): ThemePreference {
    try {
      const storedValue = this.document.defaultView?.localStorage.getItem(themeStorageKey);

      return isThemePreference(storedValue) ? storedValue : 'system';
    } catch {
      return 'system';
    }
  }

  private writeStoredPreference(themePreference: ThemePreference): void {
    try {
      this.document.defaultView?.localStorage.setItem(themeStorageKey, themePreference);
    } catch {
      // Storage is unavailable (private mode, blocked site data): the theme still applies.
    }
  }
}

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'system' || value === 'light' || value === 'dark';
}
