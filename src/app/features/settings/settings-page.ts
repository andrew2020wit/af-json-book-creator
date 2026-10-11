import { Component, inject } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { isThemePreference, ThemePreference, ThemeService } from '../../core/theme/theme.service';

interface ThemeOption {
  value: ThemePreference;
  label: string;
  icon: string;
}

const themeOptions: readonly ThemeOption[] = [
  { value: 'system', label: 'System', icon: 'routine' },
  { value: 'light', label: 'Light', icon: 'light_mode' },
  { value: 'dark', label: 'Dark', icon: 'dark_mode' },
];

@Component({
  selector: 'app-settings-page',
  imports: [MatButtonToggleModule, MatIconModule],
  template: `
    <h1 tabindex="-1">Settings</h1>

    <section aria-labelledby="theme-heading">
      <h2 id="theme-heading">Theme</h2>

      <mat-button-toggle-group
        aria-labelledby="theme-heading"
        [value]="themeService.themePreference()"
        (change)="onThemeChange($event)"
      >
        @for (themeOption of themeOptions; track themeOption.value) {
          <mat-button-toggle [value]="themeOption.value">
            <mat-icon>{{ themeOption.icon }}</mat-icon>
            {{ themeOption.label }}
          </mat-button-toggle>
        }
      </mat-button-toggle-group>

      <p class="hint">System follows the light or dark mode of your device.</p>
    </section>
  `,
  styles: `
    mat-button-toggle-group {
      flex-wrap: wrap;
    }

    mat-icon {
      vertical-align: middle;
    }

    .hint {
      color: var(--mat-sys-on-surface-variant);
    }
  `,
})
export class SettingsPage {
  protected readonly themeService = inject(ThemeService);
  protected readonly themeOptions = themeOptions;

  protected onThemeChange(buttonToggleChange: MatButtonToggleChange): void {
    if (isThemePreference(buttonToggleChange.value)) {
      this.themeService.setThemePreference(buttonToggleChange.value);
    }
  }
}
