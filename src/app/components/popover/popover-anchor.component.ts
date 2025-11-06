import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popover-anchor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[attr.data-slot]': '"popover-anchor"'
  }
})
export class PopoverAnchorComponent {}