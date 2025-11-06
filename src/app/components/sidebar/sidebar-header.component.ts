import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-header',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-header"',
    '[attr.data-sidebar]': '"header"'
  }
})
export class SidebarHeaderComponent {
  @Input() className = '';
}
