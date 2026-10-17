import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';
import { version } from '../../../../package.json';

interface NavigationLink {
  path: string;
  label: string;
  icon: string;
}

/** The editor page has no link: it is opened only through a book (spec 4.10). */
const navigationLinks: readonly NavigationLink[] = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/translation', label: 'Translation', icon: 'translate' },
  { path: '/settings', label: 'Settings', icon: 'settings' },
];

const repositoryUrl = 'https://github.com/andrew2020wit/af-json-book-creator';

const narrowScreenQuery = '(max-width: 599.98px)';

/**
 * The shared top bar. On narrow screens the links collapse behind a menu button that expands
 * them in place (a disclosure inside the header landmark, unlike an overlay menu).
 */
@Component({
  selector: 'app-top-bar',
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, RouterLink, RouterLinkActive],
  host: {
    '(keydown.escape)': 'closeMenu(true)',
  },
  template: `
    <mat-toolbar class="top-bar">
      <span class="app-name">JSON Book Creator</span>
      <span class="app-version">v{{ version }}</span>
      <span class="spacer"></span>

      @if (isNarrowScreen()) {
        <button
          #menuButton
          mat-icon-button
          type="button"
          aria-label="Navigation menu"
          aria-controls="narrow-navigation"
          [attr.aria-expanded]="isMenuOpen()"
          (click)="isMenuOpen.set(!isMenuOpen())"
        >
          <mat-icon>{{ isMenuOpen() ? 'close' : 'menu' }}</mat-icon>
        </button>
      } @else {
        <nav aria-label="Main" class="wide-navigation">
          @for (navigationLink of navigationLinks; track navigationLink.path) {
            <a
              mat-button
              [routerLink]="navigationLink.path"
              routerLinkActive="active-link"
              ariaCurrentWhenActive="page"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              <mat-icon>{{ navigationLink.icon }}</mat-icon>
              {{ navigationLink.label }}
            </a>
          }
        </nav>
      }

      <a
        mat-icon-button
        [href]="repositoryUrl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub repository (opens in a new tab)"
      >
        <svg class="github-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path
            d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
          />
        </svg>
      </a>
    </mat-toolbar>

    @if (isNarrowScreen() && isMenuOpen()) {
      <nav id="narrow-navigation" aria-label="Main" class="narrow-navigation">
        <ul>
          @for (navigationLink of navigationLinks; track navigationLink.path) {
            <li>
              <a
                [routerLink]="navigationLink.path"
                routerLinkActive="active-link"
                ariaCurrentWhenActive="page"
                [routerLinkActiveOptions]="{ exact: true }"
              >
                <mat-icon>{{ navigationLink.icon }}</mat-icon>
                {{ navigationLink.label }}
              </a>
            </li>
          }
        </ul>
      </nav>
    }
  `,
  styles: `
    .top-bar {
      gap: 8px;
    }

    .app-name {
      font: var(--mat-sys-title-large);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .app-version {
      font: var(--mat-sys-label-medium);
      color: var(--mat-sys-on-surface-variant);
      white-space: nowrap;
    }

    .github-icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .wide-navigation {
      display: flex;
      gap: 4px;
    }

    .narrow-navigation {
      background-color: var(--mat-sys-surface-container);
      border-bottom: 1px solid var(--mat-sys-outline-variant);
    }

    .narrow-navigation ul {
      margin: 0;
      padding: 8px 0;
      list-style: none;
    }

    .narrow-navigation a {
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: 48px;
      padding: 0 16px;
      color: var(--mat-sys-on-surface);
      font: var(--mat-sys-label-large);
      text-decoration: none;
    }

    .narrow-navigation a:focus-visible {
      outline: 2px solid var(--mat-sys-primary);
      outline-offset: -2px;
    }

    .active-link {
      background-color: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);
    }

    .narrow-navigation a.active-link {
      color: var(--mat-sys-on-secondary-container);
    }
  `,
})
export class TopBar {
  protected readonly navigationLinks = navigationLinks;
  protected readonly version = version;
  protected readonly repositoryUrl = repositoryUrl;
  protected readonly isMenuOpen = signal(false);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  protected readonly isNarrowScreen = toSignal(
    inject(BreakpointObserver)
      .observe(narrowScreenQuery)
      .pipe(map((breakpointState) => breakpointState.matches)),
    { initialValue: false },
  );

  constructor() {
    inject(Router)
      .events.pipe(
        filter((routerEvent) => routerEvent instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu(false));
  }

  protected closeMenu(shouldFocusButton: boolean): void {
    if (!this.isMenuOpen()) {
      return;
    }

    this.isMenuOpen.set(false);

    if (shouldFocusButton) {
      this.menuButton()?.nativeElement.focus();
    }
  }
}
