import { Component, Input, HostBinding, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resizable-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resizable-panel.component.html',
  styleUrls: ['./resizable-panel.component.css']
})
export class ResizablePanelComponent {
  @Input() defaultSize?: number;
  @Input() minSize?: number;
  @Input() maxSize?: number;
  @Input() className = '';
  @Input() id?: string;
  @Input() order?: number;

  panelSize = signal<number | undefined>(undefined);

  @HostBinding('class')
  get hostClasses(): string {
    return ['resizable-panel', this.className].filter(Boolean).join(' ');
  }

  @HostBinding('attr.data-panel-id')
  get dataPanelId(): string | undefined {
    return this.id;
  }

  @HostBinding('style.flexGrow')
  get flexGrow(): number {
    return this.panelSize() ?? this.defaultSize ?? 1;
  }

  @HostBinding('style.flexShrink')
  get flexShrink(): number {
    return 1;
  }

  @HostBinding('style.flexBasis')
  get flexBasis(): string {
    return '0%';
  }

  @HostBinding('style.minWidth')
  get minWidth(): string | undefined {
    return this.minSize ? `${this.minSize}%` : undefined;
  }

  @HostBinding('style.maxWidth')
  get maxWidth(): string | undefined {
    return this.maxSize ? `${this.maxSize}%` : undefined;
  }
}
