import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-command-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './command-dialog.component.html',
  styleUrls: ['./command-dialog.component.css']
})
export class CommandDialogComponent {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  @Input() title = 'Command Palette';
  @Input() description = 'Search for a command to run...';

  close() { this.open = false; this.openChange.emit(this.open); }
}
