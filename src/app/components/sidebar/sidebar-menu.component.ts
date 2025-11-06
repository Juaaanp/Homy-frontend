import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: flex;
      width: 100%;
      min-width: 0;
      flex-direction: column;
      gap: 0.25rem;
      list-style: none;
      padding: 0;
      margin: 0;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-menu"',
    '[attr.data-sidebar]': '"menu"',
    'role': 'list'
  }
})
export class SidebarMenuComponent {
  @Input() className = '';
}
