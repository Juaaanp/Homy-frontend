import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-rail',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styles: [`
    :host {
      position: absolute;
      right: -4px;
      top: 0;
      bottom: 0;
      width: 8px;
      cursor: col-resize;
      z-index: 20;
      opacity: 0;
      transition: opacity 0.2s;
    }

    :host:hover {
      opacity: 1;
    }

    :host::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
      width: 2px;
      height: 2rem;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 9999px;
    }

    :host-context([data-collapsible="icon"]) {
      display: none;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-rail"',
    '[attr.data-sidebar]': '"rail"'
  }
})
export class SidebarRailComponent {
  @Input() className = '';
}
