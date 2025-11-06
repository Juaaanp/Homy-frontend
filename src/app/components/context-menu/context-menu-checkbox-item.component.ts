import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu-checkbox-item',
  standalone: true,
  template: `
    <div class="cm-checkbox-item" (click)="toggle($event)">
      <span class="cm-checkbox-indicator">{{ checked ? '✓' : '' }}</span>
      <div class="cm-checkbox-content"><ng-content></ng-content></div>
    </div>
  `,
  styles: [
    `
      .cm-checkbox-item { display:flex; align-items:center; gap:8px; padding:6px 8px; cursor:pointer }
      .cm-checkbox-indicator { width:18px; text-align:center; color:var(--accent,#111) }
    `,
  ],
})
export class ContextMenuCheckboxItemComponent {
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  toggle(e: Event) {
    e.stopPropagation();
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
