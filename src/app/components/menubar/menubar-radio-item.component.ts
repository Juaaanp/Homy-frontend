import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menubar-radio-item',
  standalone: true,
  template: `
    <div class="mb-radio" (click)="select($event)">
      <span class="mb-indicator">{{ selected ? '●' : '○' }}</span>
      <div class="mb-content"><ng-content></ng-content></div>
    </div>
  `,
  styles: [`.mb-radio{display:flex;align-items:center;gap:8px;padding:6px 8px;cursor:pointer}.mb-indicator{width:18px;text-align:center}`],
})
export class MenubarRadioItemComponent {
  @Input() value: any;
  @Input() selected = false;
  @Output() selectValue = new EventEmitter<any>();

  select(e: Event) {
    e.stopPropagation();
    this.selectValue.emit(this.value);
  }
}
