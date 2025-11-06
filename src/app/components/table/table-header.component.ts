import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <thead [class]="'table-header ' + className" data-slot="table-header">
      <ng-content></ng-content>
    </thead>
  `,
  styles: [`
    .table-header :deep(tr) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  `]
})
export class TableHeaderComponent {
  @Input() className = '';
}
