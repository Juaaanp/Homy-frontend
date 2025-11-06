import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

type PanelGroupDirection = 'horizontal' | 'vertical';

@Component({
  selector: 'app-resizable-panel-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resizable-panel-group.component.html',
  styleUrls: ['./resizable-panel-group.component.css']
})
export class ResizablePanelGroupComponent {
  @Input() direction: PanelGroupDirection = 'horizontal';
  @Input() className = '';

  @HostBinding('class')
  get hostClasses(): string {
    const baseClasses = 'flex h-full w-full';
    const directionClass = this.direction === 'vertical' ? 'flex-col' : '';
    return [baseClasses, directionClass, this.className].filter(Boolean).join(' ');
  }

  @HostBinding('attr.data-panel-group-direction')
  get dataDirection(): string {
    return this.direction;
  }
}
