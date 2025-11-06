import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <td [class]="'table-cell ' + className" data-slot="table-cell">
      <ng-content></ng-content>
    </td>
  `,
  styles: [`
    .table-cell {
      padding: 0.5rem;
      vertical-align: middle;
      white-space: nowrap;
    }

    .table-cell:has([role="checkbox"]) {
      padding-right: 0;
    }

    .table-cell :deep([role="checkbox"]) {
      transform: translateY(2px);
    }
  `]
})
export class TableCellComponent {
  @Input() className = '';
}
