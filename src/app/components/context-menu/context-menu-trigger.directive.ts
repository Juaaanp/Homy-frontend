import { Directive, HostListener, Input } from '@angular/core';
import { ContextMenuService } from './context-menu.service';

@Directive({
  selector: '[contextMenuTrigger]'
})
export class ContextMenuTriggerDirective {
  @Input('contextMenuTrigger') menuId?: string; // reserved for future use

  constructor(private svc: ContextMenuService) {}

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.svc.show(event.clientX, event.clientY);
  }

  // optional: close on click outside handled by content component
}
