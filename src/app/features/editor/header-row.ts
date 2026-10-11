import { Component, computed, input, output } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HeaderFormValue } from './editor-form';

/** One row of the "Headers" section: Paragraph ID, Title and a delete button (spec 4.5). */
@Component({
  selector: 'app-header-row',
  imports: [FormField, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  host: {
    role: 'listitem',
    '[attr.data-header-key]': 'headerField()().value().key',
  },
  template: `
    <mat-form-field class="paragraph-id-field" subscriptSizing="dynamic">
      <mat-label>Paragraph ID</mat-label>
      <input
        matInput
        class="paragraph-id-input"
        type="number"
        inputmode="numeric"
        step="1"
        [formField]="headerField().paragraphId"
        (blur)="paragraphIdCommitted.emit($event)"
        (keydown.enter)="paragraphIdCommitted.emit($event)"
      />
      @if (paragraphPreview(); as preview) {
        <mat-hint class="paragraph-preview">{{ preview }}</mat-hint>
      }
      @for (error of headerField().paragraphId().errors(); track error.kind) {
        <mat-error>{{ error.message }}</mat-error>
      }
    </mat-form-field>

    <mat-form-field class="title-field" subscriptSizing="dynamic">
      <mat-label>Title</mat-label>
      <input matInput [formField]="headerField().title" />
      @for (error of headerField().title().errors(); track error.kind) {
        <mat-error>{{ error.message }}</mat-error>
      }
    </mat-form-field>

    <button
      mat-icon-button
      type="button"
      class="delete-button"
      [attr.aria-label]="deleteLabel()"
      (click)="deleted.emit()"
    >
      <mat-icon>delete</mat-icon>
    </button>
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 8px 12px;
      padding: 12px 0;
      border-bottom: 1px solid var(--mat-sys-outline-variant);
    }

    .paragraph-id-field {
      flex: 0 1 180px;
      min-width: 140px;
    }

    .title-field {
      flex: 1 1 240px;
      min-width: 0;
    }

    .paragraph-preview {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      max-width: 100%;
    }

    .delete-button {
      margin-top: 4px;
    }

    .delete-button:hover,
    .delete-button:focus-visible {
      --mat-icon-button-icon-color: var(--mat-sys-error);
      --mat-icon-button-state-layer-color: var(--mat-sys-error);
    }
  `,
})
export class HeaderRow {
  readonly headerField = input.required<FieldTree<HeaderFormValue>>();
  /** First line of the paragraph the header points to, if it exists. */
  readonly paragraphPreview = input<string | null>(null);

  readonly paragraphIdCommitted = output<Event>();
  readonly deleted = output<void>();

  protected readonly deleteLabel = computed(() => {
    const title = this.headerField().title().value().trim();

    return title ? `Delete header "${title}"` : 'Delete header';
  });
}
