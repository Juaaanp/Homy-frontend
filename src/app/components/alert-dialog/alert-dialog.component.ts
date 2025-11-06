import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {
  /** Two-way bindable open state */
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  /** Emit when user confirms */
  @Output() confirm = new EventEmitter<void>();

  /** Emit when user cancels */
  @Output() cancel = new EventEmitter<void>();

  /** When true clicking the overlay will close the dialog */
  @Input() closeOnOverlay = true;

  openDialog() {
    this.open = true;
    this.openChange.emit(this.open);
  }

  closeDialog() {
    this.open = false;
    this.openChange.emit(this.open);
  }

  onConfirm() {
    this.confirm.emit();
    this.closeDialog();
  }

  onCancel() {
    this.cancel.emit();
    this.closeDialog();
  }
}
