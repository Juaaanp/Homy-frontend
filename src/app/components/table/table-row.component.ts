import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-row',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      transition: background-color 0.2s;
    }

    :host:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }

    :host[data-state="selected"] {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `],
  host: {
    '[attr.data-slot]': '"table-row"',
    '[attr.data-state]': 'selected ? "selected" : null'
  }
})
export class TableRowComponent {
  @Input() className = '';
  @Input() selected = false;

  @HostBinding('class')
  get hostClasses() {
    return `table-row ${this.className}`;
  }
}
