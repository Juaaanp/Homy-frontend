import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menubar-checkbox-item',
  standalone: true,
  template: `
    <div class="mb-checkbox" (click)="toggle($event)">
      <span class="mb-indicator">{{ checked ? '✓' : '' }}</span>
      <div class="mb-content"><ng-content></ng-content></div>
    </div>
  `,
  styles: [`.mb-checkbox{display:flex;align-items:center;gap:8px;padding:6px 8px;cursor:pointer}.mb-indicator{width:18px;text-align:center}`],
})
export class MenubarCheckboxItemComponent {
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  toggle(e: Event) {
    e.stopPropagation();
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
