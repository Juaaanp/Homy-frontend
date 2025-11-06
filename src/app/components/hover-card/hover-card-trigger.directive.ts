import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { HoverCardService } from './hover-card.service';

@Directive({ selector: '[hoverCardTrigger]' })
export class HoverCardTriggerDirective {
  @Input('hoverCardTrigger') align: 'center' | 'start' | 'end' = 'center';
  @Input() sideOffset = 4;

  constructor(private el: ElementRef<HTMLElement>, private svc: HoverCardService) {}

  @HostListener('mouseenter')
  onEnter() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.bottom;
    this.svc.show(x, y, this.align, this.sideOffset);
  }

  @HostListener('mouseleave')
  onLeave() {
    this.svc.scheduleHide();
  }
}
