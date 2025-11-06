import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationLinkComponent } from './pagination-link.component';

@Component({
  selector: 'app-pagination-previous',
  standalone: true,
  imports: [CommonModule, PaginationLinkComponent],
  template: `
    <app-pagination-link
      aria-label="Go to previous page"
      [size]="'default'"
      [className]="baseClass + (className ? ' ' + className : '')"
      [href]="href"
      [isActive]="isActive"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span class="hidden sm:block">Previous</span>
    </app-pagination-link>
  `,
})
export class PaginationPreviousComponent {
  @Input() className = '';
  @Input() href: string | null = null;
  @Input() isActive = false;

  baseClass = 'gap-1 px-2.5 sm:pl-2.5';
}
