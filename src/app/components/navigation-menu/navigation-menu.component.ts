import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationMenuViewportComponent } from './navigation-menu-viewport.component';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [CommonModule, NavigationMenuViewportComponent],
  template: `
    <div
      data-slot="navigation-menu"
      [attr.data-viewport]="viewport"
      [class]="baseClass + (className ? ' ' + className : '')"
    >
      <ng-content></ng-content>
      <app-navigation-menu-viewport *ngIf="viewport"></app-navigation-menu-viewport>
    </div>
  `,
  styles: [],
})
export class NavigationMenuComponent {
  @Input() className = '';
  @Input() viewport = true;

  baseClass = 'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center';
}
