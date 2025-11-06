import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PaginationSize = 'icon' | 'default' | 'sm' | 'lg';

@Component({
  selector: 'app-pagination-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      data-slot="pagination-link"
      [attr.aria-current]="isActive ? 'page' : null"
      [attr.data-active]="isActive"
      [class]="computedClass"
      [attr.href]="href"
    >
      <ng-content></ng-content>
    </a>
  `,
})
export class PaginationLinkComponent {
  @Input() className = '';
  @Input() isActive = false;
  @Input() size: PaginationSize = 'icon';
  @Input() href: string | null = null;

  // Simple variant mapping; project may have a buttonVariants util — we mirror basic behavior
  get computedClass() {
    const variant = this.isActive ? 'outline' : 'ghost';
    const sizeClass = this.size === 'icon' ? 'size-9' : this.size === 'default' ? 'px-2.5' : this.size;
    return [variant, sizeClass, this.className].filter(Boolean).join(' ');
  }
}
