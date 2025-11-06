import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
  /** Controlled checked state */
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  /** Disabled state */
  @Input() disabled = false;

  /** Optional aria-label */
  @Input() ariaLabel?: string;

  toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
