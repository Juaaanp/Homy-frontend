import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-menu-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul data-slot="navigation-menu-list" [class]="baseClass + (className ? ' ' + className : '')">
      <ng-content></ng-content>
    </ul>
  `,
})
export class NavigationMenuListComponent {
  @Input() className = '';

  baseClass = 'group flex flex-1 list-none items-center justify-center gap-1';
}
