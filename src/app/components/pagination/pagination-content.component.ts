import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul data-slot="pagination-content" [class]="baseClass + (className ? ' ' + className : '')">
      <ng-content></ng-content>
    </ul>
  `,
})
export class PaginationContentComponent {
  @Input() className = '';

  baseClass = 'flex flex-row items-center gap-1';
}
