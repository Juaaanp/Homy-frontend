import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu-radio-item',
  standalone: true,
  template: `
    <div class="dm-radio" (click)="select($event)">
      <span class="dm-indicator">{{ selected ? '●' : '○' }}</span>
      <div class="dm-content"><ng-content></ng-content></div>
    </div>
  `,
  styles: [
    `
      .dm-radio { display:flex; align-items:center; gap:8px; padding:6px 8px; cursor:pointer }
      .dm-indicator { width:18px; text-align:center }
    `,
  ],
})
export class DropdownMenuRadioItemComponent {
  @Input() value: any;
  @Input() selected = false;
  @Output() selectValue = new EventEmitter<any>();

  select(e: Event) {
    e.stopPropagation();
    this.selectValue.emit(this.value);
  }
}
