import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-body',
  standalone: true,
  imports: [CommonModule],
  template: `
    <tbody [class]="'table-body ' + className" data-slot="table-body">
      <ng-content></ng-content>
    </tbody>
  `,
  styles: [`
    .table-body :deep(tr:last-child) {
      border-bottom: 0;
    }
  `]
})
export class TableBodyComponent {
  @Input() className = '';
}
