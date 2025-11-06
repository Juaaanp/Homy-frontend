import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-group-content',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-group-content"',
    '[attr.data-sidebar]': '"group-content"'
  }
})
export class SidebarGroupContentComponent {
  @Input() className = '';
}
