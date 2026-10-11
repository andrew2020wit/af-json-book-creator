import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface FileError {
  fileName: string;
  messages: string[];
}

/** An alert with the errors of one or more files. */
@Component({
  selector: 'app-file-errors',
  imports: [MatIconModule],
  template: `
    @if (fileErrors().length > 0) {
      <div class="file-errors" role="alert">
        <mat-icon class="error-icon">error</mat-icon>
        <div>
          <p class="error-title">{{ title() }}</p>
          <ul>
            @for (fileError of fileErrors(); track $index) {
              <li>
                <strong>{{ fileError.fileName }}</strong>
                @for (message of fileError.messages; track $index) {
                  <span class="message">{{ message }}</span>
                }
              </li>
            }
          </ul>
        </div>
      </div>
    }
  `,
  styles: `
    .file-errors {
      display: flex;
      gap: 12px;
      margin: 16px 0;
      padding: 12px 16px;
      border-radius: 12px;
      background-color: var(--mat-sys-error-container);
      color: var(--mat-sys-on-error-container);
      overflow-wrap: anywhere;
    }

    .error-icon {
      flex-shrink: 0;
    }

    .error-title {
      margin: 0 0 4px;
      font: var(--mat-sys-title-small);
    }

    ul {
      margin: 0;
      padding-left: 20px;
    }

    .message {
      display: block;
    }
  `,
})
export class FileErrors {
  readonly title = input('Something went wrong');
  readonly fileErrors = input.required<readonly FileError[]>();
}
