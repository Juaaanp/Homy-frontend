import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip-content.component.html',
  styleUrls: ['./tooltip-content.component.css']
})
export class TooltipContentComponent {
  @Input() className = '';
  @Input() sideOffset = 0;
  @Input() side: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @HostBinding('attr.data-slot') dataSlot = 'tooltip-content';
  @HostBinding('class') get hostClass() {
    return `tooltip-content ${this.className}`;
  }
  @HostBinding('attr.data-side') get dataSide() { return this.side; }
}
