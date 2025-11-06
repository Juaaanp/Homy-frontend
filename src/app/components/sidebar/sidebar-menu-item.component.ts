import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
      position: relative;
      list-style: none;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-menu-item"',
    '[attr.data-sidebar]': '"menu-item"',
    'class': 'group/menu-item'
  }
})
export class SidebarMenuItemComponent {
  @Input() className = '';
}
