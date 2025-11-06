import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu-checkbox-item',
  standalone: true,
  template: `
    <div class="dm-checkbox" (click)="toggle($event)">
      <span class="dm-indicator">{{ checked ? '✓' : '' }}</span>
      <div class="dm-content"><ng-content></ng-content></div>
    </div>
  `,
  styles: [
    `
      .dm-checkbox { display:flex; align-items:center; gap:8px; padding:6px 8px; cursor:pointer }
      .dm-indicator { width:18px; text-align:center }
    `,
  ],
})
export class DropdownMenuCheckboxItemComponent {
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  toggle(e: Event) {
    e.stopPropagation();
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
