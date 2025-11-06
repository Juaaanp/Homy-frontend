import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu-radio-item',
  standalone: true,
  template: `
    <div class="cm-radio-item" (click)="select($event)">
      <span class="cm-radio-indicator">{{ selected ? '●' : '○' }}</span>
      <div class="cm-radio-content"><ng-content></ng-content></div>
    </div>
  `,
  styles: [
    `
      .cm-radio-item { display:flex; align-items:center; gap:8px; padding:6px 8px; cursor:pointer }
      .cm-radio-indicator { width:18px; text-align:center; color:var(--accent,#111) }
    `,
  ],
})
export class ContextMenuRadioItemComponent {
  @Input() value: any;
  @Input() selected = false;
  @Output() selectValue = new EventEmitter<any>();

  select(e: Event) {
    e.stopPropagation();
    this.selectValue.emit(this.value);
  }
}
