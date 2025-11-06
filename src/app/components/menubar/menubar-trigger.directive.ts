import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MenubarService } from './menubar.service';

@Directive({ selector: '[menubarTrigger]' })
export class MenubarTriggerDirective {
  @Input('menubarTrigger') menuId = '';

  constructor(private el: ElementRef<HTMLElement>, private svc: MenubarService) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.preventDefault();
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = rect.left;
    const y = rect.bottom;
    // toggle open for this id
    this.svc.show(this.menuId || '', x, y);
  }
}
