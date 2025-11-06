import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-inset',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: flex;
      flex: 1;
      flex-direction: column;
      position: relative;
      min-width: 0;
      background-color: var(--bs-body-bg);
    }

    @media (min-width: 768px) {
      :host {
        margin: 0.5rem;
        margin-left: 0;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
      }
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-inset"',
    '[attr.data-sidebar]': '"inset"'
  }
})
export class SidebarInsetComponent {
  @Input() className = '';
}
