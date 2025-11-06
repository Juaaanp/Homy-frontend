import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-menu-sub',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: flex;
      min-width: 0;
      flex-direction: column;
      gap: 0.25rem;
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      padding: 0 0 0 0.75rem;
      margin-left: 0.75rem;
      list-style: none;
    }

    :host-context([data-collapsible="icon"]) {
      display: none;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-menu-sub"',
    '[attr.data-sidebar]': '"menu-sub"',
    'role': 'list'
  }
})
export class SidebarMenuSubComponent {
  @Input() className = '';
}
