import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`
})
export class TooltipTriggerComponent {
  @HostBinding('attr.data-slot') dataSlot = 'tooltip-trigger';
}
