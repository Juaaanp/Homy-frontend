import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-menu-action',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      position: absolute;
      right: 0.25rem;
      top: 0.375rem;
      display: flex;
      aspect-ratio: 1;
      width: 1.5rem;
      align-items: center;
      justify-content: center;
      border-radius: 0.375rem;
      padding: 0;
      outline: none;
      transition: opacity 0.2s;
      cursor: pointer;
    }

    :host:hover {
      background-color: rgba(var(--bs-primary-rgb), 0.1);
      color: var(--bs-primary);
    }

    :host:focus-visible {
      outline: 2px solid var(--bs-primary);
      outline-offset: 2px;
    }

    :host-context([data-size="sm"]) {
      width: 1.25rem;
      right: 0.125rem;
      top: 0.125rem;
    }

    :host-context([data-size="lg"]) {
      width: 2rem;
      right: 0.25rem;
      top: 0.5rem;
    }

    /* Hide unless parent menu item is hovered or button is focused */
    :host {
      opacity: 0;
    }

    :host-context(.group/menu-item:hover) {
      opacity: 1;
    }

    :host:focus-visible {
      opacity: 1;
    }

    :host-context(.peer/menu-button[data-active="true"]) {
      opacity: 1;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-menu-action"',
    '[attr.data-sidebar]': '"menu-action"',
    'tabindex': '0',
    'role': 'button'
  }
})
export class SidebarMenuActionComponent {
  @Input() className = '';
  @Input() showOnHover = true;
}
