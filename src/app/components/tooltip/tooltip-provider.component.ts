import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip-provider',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`
})
export class TooltipProviderComponent {
  @Input() delayDuration = 0;
}
