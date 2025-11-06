import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-menu-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div data-slot="navigation-menu-indicator" [class]="baseClass + (className ? ' ' + className : '')">
      <div class="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md"></div>
    </div>
  `,
})
export class NavigationMenuIndicatorComponent {
  @Input() className = '';

  baseClass = 'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden';
}
