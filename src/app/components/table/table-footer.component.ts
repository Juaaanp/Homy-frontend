import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <tfoot [class]="'table-footer ' + className" data-slot="table-footer">
      <ng-content></ng-content>
    </tfoot>
  `,
  styles: [`
    .table-footer {
      background-color: rgba(0, 0, 0, 0.02);
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      font-weight: 500;
    }

    .table-footer :deep(tr:last-child) {
      border-bottom: 0;
    }
  `]
})
export class TableFooterComponent {
  @Input() className = '';
}
