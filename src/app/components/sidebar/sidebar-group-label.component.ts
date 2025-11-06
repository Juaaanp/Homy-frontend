import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-group-label',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: flex;
      height: 2rem;
      flex-shrink: 0;
      align-items: center;
      border-radius: 0.375rem;
      padding: 0 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.65);
      outline: none;
      transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
    }

    :host:hover {
      background-color: rgba(var(--bs-primary-rgb), 0.05);
      color: var(--bs-dark);
    }

    :host-context([data-collapsible="icon"]) {
      display: none;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-group-label"',
    '[attr.data-sidebar]': '"group-label"'
  }
})
export class SidebarGroupLabelComponent {
  @Input() asChild = false;
  @Input() className = '';
}
