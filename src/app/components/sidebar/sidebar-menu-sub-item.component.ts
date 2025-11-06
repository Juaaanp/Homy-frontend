import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-menu-sub-item',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
      list-style: none;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-menu-sub-item"',
    '[attr.data-sidebar]': '"menu-sub-item"'
  }
})
export class SidebarMenuSubItemComponent {
  @Input() className = '';
}
