import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { DropdownService } from './dropdown.service';

@Directive({ selector: '[dropdownTrigger]' })
export class DropdownTriggerDirective {
  @Input('dropdownTrigger') openOnHover = false;

  constructor(private el: ElementRef<HTMLElement>, private svc: DropdownService) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.preventDefault();
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.svc.show(rect.left, rect.bottom);
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(e: MouseEvent) {
    // also support contextmenu if needed
    e.preventDefault();
    this.svc.show(e.clientX, e.clientY);
  }
}
