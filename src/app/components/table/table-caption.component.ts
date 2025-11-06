import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-caption',
  standalone: true,
  imports: [CommonModule],
  template: `
    <caption [class]="'table-caption ' + className" data-slot="table-caption">
      <ng-content></ng-content>
    </caption>
  `,
  styles: [`
    .table-caption {
      margin-top: 1rem;
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.55);
    }
  `]
})
export class TableCaptionComponent {
  @Input() className = '';
}
