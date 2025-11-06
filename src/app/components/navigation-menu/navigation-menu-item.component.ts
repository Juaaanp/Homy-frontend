import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <li data-slot="navigation-menu-item" [class]="baseClass + (className ? ' ' + className : '')">
      <ng-content></ng-content>
    </li>
  `,
})
export class NavigationMenuItemComponent {
  @Input() className = '';

  baseClass = 'relative';
}
