import { inject, Service } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialog, ConfirmDialogData } from './confirm-dialog';

@Service()
export class ConfirmDialogService {
  private readonly matDialog = inject(MatDialog);

  async confirm(confirmDialogData: ConfirmDialogData): Promise<boolean> {
    const dialogRef = this.matDialog.open<ConfirmDialog, ConfirmDialogData, boolean>(
      ConfirmDialog,
      { data: confirmDialogData, role: 'alertdialog', maxWidth: 'calc(100vw - 32px)' },
    );

    return (await firstValueFrom(dialogRef.afterClosed())) === true;
  }
}
