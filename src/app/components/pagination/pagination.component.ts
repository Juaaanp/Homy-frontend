import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      [class]="baseClass + (className ? ' ' + className : '')"
    >
      <ng-content></ng-content>
    </nav>
  `,
})
export class PaginationComponent {
  @Input() className = '';

  baseClass = 'mx-auto flex w-full justify-center';
}
