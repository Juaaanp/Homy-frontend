import { Directive, HostListener, Input } from '@angular/core';
import { DrawerService, DrawerDirection } from './drawer.service';

@Directive({ selector: '[drawerTrigger]' })
export class DrawerTriggerDirective {
  @Input('drawerTrigger') direction?: DrawerDirection;

  constructor(private svc: DrawerService) {}

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    this.svc.open(this.direction ?? 'right');
  }
}
