import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-content',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: flex;
      min-height: 0;
      flex: 1;
      flex-direction: column;
      gap: 0.5rem;
      overflow: auto;
    }
    
    :host-context([data-collapsible="icon"]) {
      overflow: hidden;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-content"',
    '[attr.data-sidebar]': '"content"'
  }
})
export class SidebarContentComponent {
  @Input() className = '';
}
