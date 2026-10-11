import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/** A Material button that opens the system file dialog. */
@Component({
  selector: 'app-file-picker-button',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <input
      #fileInput
      type="file"
      class="file-input"
      tabindex="-1"
      aria-hidden="true"
      [accept]="accept()"
      [multiple]="multiple()"
      (change)="onFilesChange(fileInput)"
    />
    <button
      [matButton]="appearance()"
      type="button"
      [disabled]="disabled()"
      [attr.aria-describedby]="describedBy()"
      (click)="fileInput.click()"
    >
      <mat-icon>{{ icon() }}</mat-icon>
      {{ label() }}
    </button>
  `,
  styles: `
    .file-input {
      display: none;
    }

    button {
      min-height: 44px;
    }
  `,
})
export class FilePickerButton {
  readonly label = input.required<string>();
  readonly icon = input('upload_file');
  readonly accept = input('');
  readonly multiple = input(false);
  readonly disabled = input(false);
  readonly appearance = input<'filled' | 'outlined'>('filled');
  readonly describedBy = input<string | null>(null);

  readonly filesSelected = output<File[]>();

  protected onFilesChange(fileInput: HTMLInputElement): void {
    const files = Array.from(fileInput.files ?? []);

    // Reset, so that choosing the same file again triggers `change`.
    fileInput.value = '';

    if (files.length > 0) {
      this.filesSelected.emit(files);
    }
  }
}
