import { afterNextRender, Component, ElementRef, inject, Injector, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconRegistry } from '@angular/material/icon';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, skip } from 'rxjs';
import { TopBar } from './core/layout/top-bar';
import { ThemeService } from './core/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly injector = inject(Injector);
  private readonly mainElement = viewChild.required<ElementRef<HTMLElement>>('mainElement');

  constructor() {
    // Created here so the stored theme applies on startup.
    inject(ThemeService);
    inject(MatIconRegistry).setDefaultFontSetClass('material-symbols-outlined');

    inject(Router)
      .events.pipe(
        filter((routerEvent) => routerEvent instanceof NavigationEnd),
        skip(1),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.focusPageHeading());
  }

  protected skipToMainContent(event: Event): void {
    event.preventDefault();
    this.focusPageHeading();
  }

  /** Moves focus to the new page's heading so screen readers announce the page change. */
  private focusPageHeading(): void {
    afterNextRender(
      {
        write: () => {
          const mainElement = this.mainElement().nativeElement;
          const headingElement = mainElement.querySelector<HTMLElement>('h1');

          (headingElement ?? mainElement).focus();
        },
      },
      { injector: this.injector },
    );
  }
}
