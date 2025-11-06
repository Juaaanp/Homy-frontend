import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-group',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: flex;
      width: 100%;
      min-width: 0;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem 0;
    }

    :host-context([data-collapsible="icon"]) {
      gap: 0.25rem;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-group"',
    '[attr.data-sidebar]': '"group"',
    'class': 'group/collapsible'
  }
})
export class SidebarGroupComponent {
  @Input() className = '';
}
