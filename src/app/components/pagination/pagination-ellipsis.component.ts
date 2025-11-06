import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination-ellipsis',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span aria-hidden data-slot="pagination-ellipsis" [class]="baseClass + (className ? ' ' + className : '')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="6" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="18" cy="12" r="1.5" fill="currentColor" />
      </svg>
      <span class="sr-only">More pages</span>
    </span>
  `,
})
export class PaginationEllipsisComponent {
  @Input() className = '';

  baseClass = 'flex size-9 items-center justify-center';
}
