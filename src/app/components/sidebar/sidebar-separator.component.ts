import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-separator',
  standalone: true,
  imports: [CommonModule],
  template: '<div class="separator-line" [class]="className"></div>',
  styles: [`
    :host {
      display: block;
      margin: 0.25rem 0;
    }

    .separator-line {
      width: 100%;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.1);
    }

    :host-context([data-collapsible="icon"]) {
      margin: 0.125rem 0;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-separator"',
    '[attr.data-sidebar]': '"separator"'
  }
})
export class SidebarSeparatorComponent {
  @Input() className = '';
}
