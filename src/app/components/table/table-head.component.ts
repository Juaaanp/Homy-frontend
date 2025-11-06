import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-head',
  standalone: true,
  imports: [CommonModule],
  template: `
    <th [class]="'table-head ' + className" data-slot="table-head">
      <ng-content></ng-content>
    </th>
  `,
  styles: [`
    .table-head {
      height: 2.5rem;
      padding: 0 0.5rem;
      text-align: left;
      vertical-align: middle;
      font-weight: 500;
      color: var(--bs-dark);
      white-space: nowrap;
    }

    .table-head:has([role="checkbox"]) {
      padding-right: 0;
    }

    .table-head :deep([role="checkbox"]) {
      transform: translateY(2px);
    }
  `]
})
export class TableHeadComponent {
  @Input() className = '';
}
