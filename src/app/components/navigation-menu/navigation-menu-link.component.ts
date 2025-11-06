import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-menu-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a data-slot="navigation-menu-link" [class]="baseClass + (className ? ' ' + className : '')">
      <ng-content></ng-content>
    </a>
  `,
})
export class NavigationMenuLinkComponent {
  @Input() className = '';

  baseClass = 'flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none';
}
