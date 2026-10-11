import { TestBed } from '@angular/core/testing';
import { themeStorageKey, ThemeService } from './theme.service';

describe('ThemeService', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.style.colorScheme = '';
    vi.restoreAllMocks();
  });

  it('defaults to the system theme', () => {
    const themeService = TestBed.inject(ThemeService);

    TestBed.tick();

    expect(themeService.themePreference()).toBe('system');
    expect(document.documentElement.style.colorScheme).toBe('light dark');
  });

  it('restores the stored choice', () => {
    localStorage.setItem(themeStorageKey, 'dark');

    const themeService = TestBed.inject(ThemeService);

    TestBed.tick();

    expect(themeService.themePreference()).toBe('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });

  it('applies and stores a new choice', () => {
    const themeService = TestBed.inject(ThemeService);

    themeService.setThemePreference('light');
    TestBed.tick();

    expect(document.documentElement.style.colorScheme).toBe('light');
    expect(localStorage.getItem(themeStorageKey)).toBe('light');
  });

  it('ignores an invalid stored value', () => {
    localStorage.setItem(themeStorageKey, 'purple');

    expect(TestBed.inject(ThemeService).themePreference()).toBe('system');
  });

  it('works when storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    const themeService = TestBed.inject(ThemeService);

    themeService.setThemePreference('dark');
    TestBed.tick();

    expect(document.documentElement.style.colorScheme).toBe('dark');
  });
});
