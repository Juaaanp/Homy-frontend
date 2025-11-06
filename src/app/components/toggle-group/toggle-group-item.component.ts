import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToggleGroupVariant = 'default' | 'outline';
export type ToggleGroupSize = 'default' | 'sm' | 'lg';

@Component({
  selector: 'app-toggle-group-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-group-item.component.html',
  styleUrls: ['./toggle-group-item.component.css']
})
export class ToggleGroupItemComponent {
  @Input() variant: ToggleGroupVariant = 'default';
  @Input() size: ToggleGroupSize = 'default';
  @Input() className = '';
  @Input() disabled = false;
  @Input() value = '';

  @HostBinding('attr.data-slot') dataSlot = 'toggle-group-item';
  @HostBinding('attr.data-variant') get dataVariant() { return this.variant; }
  @HostBinding('attr.data-size') get dataSize() { return this.size; }
  @HostBinding('class') get hostClass() {
    return `${this.getToggleClass()} min-w-0 flex-1 shrink-0 rounded-none shadow-none ${this.className}`;
  }

  getToggleClass(): string {
    let base = '';
    switch (this.variant) {
      case 'outline':
        base += 'toggle-outline';
        break;
      default:
        base += 'toggle-default';
    }
    switch (this.size) {
      case 'sm':
        base += ' toggle-sm';
        break;
      case 'lg':
        base += ' toggle-lg';
        break;
      default:
        base += ' toggle-default-size';
    }
    return base;
  }
}
