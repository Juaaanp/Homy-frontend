import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-area.component.html',
  styleUrls: ['./scroll-area.component.css']
})
export class ScrollAreaComponent {
  @Input() className = '';
  @Input() maxHeight?: string;

  @HostBinding('class')
  get hostClasses(): string {
    return ['scroll-area-root', 'relative', this.className].filter(Boolean).join(' ');
  }

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'scroll-area';
  }
}
