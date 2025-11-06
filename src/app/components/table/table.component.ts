import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-container" data-slot="table-container">
      <table [class]="'table-base ' + className" data-slot="table">
        <ng-content></ng-content>
      </table>
    </div>
  `,
  styles: [`
    .table-container {
      position: relative;
      width: 100%;
      overflow-x: auto;
    }

    .table-base {
      width: 100%;
      caption-side: bottom;
      font-size: 0.875rem;
      border-collapse: collapse;
    }
  `]
})
export class TableComponent {
  @Input() className = '';
}
