import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-menu-viewport',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="absolute top-full left-0 isolate z-50 flex justify-center">
      <div
        data-slot="navigation-menu-viewport"
        [class]="baseClass + (className ? ' ' + className : '')"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class NavigationMenuViewportComponent {
  @Input() className = '';

  baseClass = 'origin-top-center bg-popover text-popover-foreground relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]';
}
