import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-menu-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button type="button" data-slot="navigation-menu-trigger" [class]="baseClass + (className ? ' ' + className : '')">
      <ng-content></ng-content>
      <svg class="relative top-[1px] ml-1 size-3 transition duration-300" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  `,
})
export class NavigationMenuTriggerComponent {
  @Input() className = '';

  baseClass = 'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50';
}
