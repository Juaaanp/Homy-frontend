import { Component, HostListener, Optional, Host } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';

@Component({
  selector: 'app-popover-trigger, [appPopoverTrigger]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      cursor: pointer;
    }
  `],
  host: {
    '[attr.data-slot]': '"popover-trigger"',
    '[attr.aria-expanded]': 'popover?.open',
  }
})
export class PopoverTriggerComponent {
  constructor(
    @Optional() @Host() public popover: PopoverComponent
  ) {}

  @HostListener('click')
  onClick() {
    if (this.popover) {
      this.popover.toggleOpen(!this.popover.open);
    }
  }
}