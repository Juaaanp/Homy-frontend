import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipProviderComponent } from './tooltip-provider.component';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule, TooltipProviderComponent],
  template: `
    <app-tooltip-provider [delayDuration]="delayDuration">
      <ng-content></ng-content>
    </app-tooltip-provider>
  `
})
export class TooltipComponent {
  @Input() delayDuration = 0;
}
