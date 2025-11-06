import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-group-action',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      position: absolute;
      right: 0.75rem;
      top: 0.875rem;
      display: flex;
      aspect-ratio: 1;
      width: 1.25rem;
      align-items: center;
      justify-content: center;
      border-radius: 0.375rem;
      padding: 0;
      color: rgba(0, 0, 0, 0.45);
      outline: none;
      transition: background-color 0.2s;
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

    :host-context([data-collapsible="icon"]) {
      display: none;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-group-action"',
    '[attr.data-sidebar]': '"group-action"',
    'tabindex': '0',
    'role': 'button'
  }
})
export class SidebarGroupActionComponent {
  @Input() asChild = false;
  @Input() className = '';
}
