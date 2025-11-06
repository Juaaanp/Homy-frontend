import { Component, Input, ContentChildren, QueryList, AfterContentInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToggleGroupVariant = 'default' | 'outline';
export type ToggleGroupSize = 'default' | 'sm' | 'lg';

@Component({
  selector: 'app-toggle-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-group.component.html',
  styleUrls: ['./toggle-group.component.css']
})
export class ToggleGroupComponent implements AfterContentInit {
  @Input() variant: ToggleGroupVariant = 'default';
  @Input() size: ToggleGroupSize = 'default';
  @Input() className = '';

  @ContentChildren('app-toggle-group-item', { descendants: true }) items!: QueryList<any>;

  @HostBinding('attr.data-slot') dataSlot = 'toggle-group';
  @HostBinding('attr.data-variant') get dataVariant() { return this.variant; }
  @HostBinding('attr.data-size') get dataSize() { return this.size; }
  @HostBinding('class') get hostClass() {
    return `group-toggle-group flex w-fit items-center rounded-md ${this.variant === 'outline' ? 'shadow-xs' : ''} ${this.className}`;
  }

  ngAfterContentInit(): void {
    this.items.forEach(item => {
      item.variant = this.variant;
      item.size = this.size;
    });
  }
}
