import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-menu-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-content" [class]="className">
      <div class="skeleton-icon"></div>
      <div class="skeleton-lines">
        <div class="skeleton-line skeleton-line-1"></div>
        <div class="skeleton-line skeleton-line-2" *ngIf="showSubtitle"></div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      padding: 0.5rem;
      gap: 0.5rem;
    }

    .skeleton-content {
      display: flex;
      width: 100%;
      gap: 0.5rem;
      align-items: center;
    }

    .skeleton-icon,
    .skeleton-line {
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.06) 25%,
        rgba(0, 0, 0, 0.15) 37%,
        rgba(0, 0, 0, 0.06) 63%
      );
      background-size: 400% 100%;
      animation: skeleton-loading 1.4s ease infinite;
      border-radius: 0.25rem;
    }

    @keyframes skeleton-loading {
      0% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0 50%;
      }
    }

    .skeleton-icon {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }

    .skeleton-lines {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 0.25rem;
    }

    .skeleton-line {
      height: 0.5rem;
    }

    .skeleton-line-1 {
      width: 60%;
    }

    .skeleton-line-2 {
      width: 40%;
    }

    :host-context([data-size="sm"]) {
      padding: 0.25rem;
    }

    :host-context([data-size="sm"]) .skeleton-icon {
      width: 0.75rem;
      height: 0.75rem;
    }

    :host-context([data-size="sm"]) .skeleton-line {
      height: 0.375rem;
    }

    :host-context([data-size="lg"]) {
      padding: 0.75rem;
    }

    :host-context([data-size="lg"]) .skeleton-icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    :host-context([data-size="lg"]) .skeleton-line {
      height: 0.625rem;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-menu-skeleton"',
    '[attr.data-sidebar]': '"menu-skeleton"'
  }
})
export class SidebarMenuSkeletonComponent {
  @Input() className = '';
  @Input() showSubtitle = false;
}
