import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menubar',
  standalone: true,
  template: `<nav data-slot="menubar" [class]="baseClasses + (className ? ' ' + className : '')"><ng-content></ng-content></nav>`,
})
export class MenubarComponent {
  @Input() className = '';

  baseClasses = 'bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs';
}
