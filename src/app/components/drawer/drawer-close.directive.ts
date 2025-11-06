import { Directive, HostListener } from '@angular/core';
import { DrawerService } from './drawer.service';

@Directive({ selector: '[drawerClose]' })
export class DrawerCloseDirective {
  constructor(private svc: DrawerService) {}

  @HostListener('click', ['$event'])
  onClick(e: Event) {
    e.preventDefault();
    this.svc.close();
  }
}
