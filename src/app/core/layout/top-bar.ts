import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';

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
