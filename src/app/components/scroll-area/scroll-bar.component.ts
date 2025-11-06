import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

type ScrollBarOrientation = 'vertical' | 'horizontal';

@Component({
  selector: 'app-scroll-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-bar.component.html',
  styleUrls: ['./scroll-bar.component.css']
})
export class ScrollBarComponent {
  @Input() orientation: ScrollBarOrientation = 'vertical';
  @Input() className = '';

  @HostBinding('class')
  get hostClasses(): string {
    const baseClasses = 'flex touch-none p-px transition-colors select-none';
    const orientationClasses =
      this.orientation === 'vertical'
        ? 'h-full w-2.5 border-l border-l-transparent'
        : 'h-2.5 flex-col border-t border-t-transparent';
    return [baseClasses, orientationClasses, this.className].filter(Boolean).join(' ');
  }

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'scroll-area-scrollbar';
  }

  @HostBinding('attr.data-orientation')
  get dataOrientation(): string {
    return this.orientation;
  }
}
