import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-menu-badge',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      position: absolute;
      right: 0.25rem;
      display: flex;
      height: 1.25rem;
      min-width: 1.25rem;
      align-items: center;
      justify-content: center;
      border-radius: 0.375rem;
      padding: 0 0.375rem;
      font-size: 0.625rem;
      font-weight: 500;
      background-color: rgba(var(--bs-primary-rgb), 0.1);
      color: var(--bs-primary);
      pointer-events: none;
    }

    :host-context([data-size="sm"]) {
      height: 1rem;
      min-width: 1rem;
      font-size: 0.5625rem;
      right: 0.125rem;
    }

    :host-context([data-size="lg"]) {
      height: 1.5rem;
      min-width: 1.5rem;
      font-size: 0.6875rem;
      right: 0.25rem;
    }

    /* Hide when menu action is visible */
    :host-context(.group/menu-item:hover) {
      opacity: 0;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-menu-badge"',
    '[attr.data-sidebar]': '"menu-badge"'
  }
})
export class SidebarMenuBadgeComponent {
  @Input() className = '';
}
