import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-menu-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div data-slot="navigation-menu-content" [class]="baseClass + (className ? ' ' + className : '')">
      <ng-content></ng-content>
    </div>
  `,
})
export class NavigationMenuContentComponent {
  @Input() className = '';

  baseClass = 'top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto';
}
