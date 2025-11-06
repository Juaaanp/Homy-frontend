import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-option',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SelectOptionComponent {
  @Input() value: any;
  @Input() disabled = false;
  @Input() className = '';

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'select-item';
  }
}
