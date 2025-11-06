import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonSize = 'default' | 'sm' | 'lg';

@Component({
  selector: 'app-sidebar-menu-sub-button',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: flex;
      width: 100%;
      min-width: 0;
      align-items: center;
      gap: 0.5rem;
      overflow: hidden;
      border-radius: 0.375rem;
      padding: 0.5rem;
      color: rgba(0, 0, 0, 0.65);
      outline: none;
      transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      cursor: pointer;
      user-select: none;
    }

    :host:hover {
      background-color: rgba(var(--bs-primary-rgb), 0.1);
      color: var(--bs-primary);
    }

    :host:focus-visible {
      outline: 2px solid var(--bs-primary);
      outline-offset: 2px;
    }

    :host[data-active="true"] {
      background-color: rgba(var(--bs-primary-rgb), 0.1);
      font-weight: 500;
      color: var(--bs-primary);
    }

    :host[data-size="sm"] {
      height: 1.75rem;
      font-size: 0.75rem;
    }

    :host[data-size="default"] {
      height: 2rem;
      font-size: 0.875rem;
    }

    :host[data-size="lg"] {
      height: 3rem;
      font-size: 0.875rem;
    }

    /* Truncate text */
    :host ::ng-deep span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-menu-sub-button"',
    '[attr.data-sidebar]': '"menu-sub-button"'
  }
})
export class SidebarMenuSubButtonComponent {
  @Input() size: ButtonSize = 'default';
  @Input() isActive = false;
  @Input() className = '';

  @HostBinding('attr.data-size')
  get dataSize() {
    return this.size;
  }

  @HostBinding('attr.data-active')
  get dataActive() {
    return this.isActive;
  }
}
