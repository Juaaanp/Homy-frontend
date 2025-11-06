import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToggleVariant = 'default' | 'outline';
export type ToggleSize = 'default' | 'sm' | 'lg';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {
  @Input() variant: ToggleVariant = 'default';
  @Input() size: ToggleSize = 'default';
  @Input() className = '';
  @Input() disabled = false;
  @Input() ariaInvalid: boolean | null = null;
  @Input() state: 'on' | 'off' = 'off';

  @HostBinding('attr.data-slot') dataSlot = 'toggle';
  @HostBinding('attr.data-state') get dataState() { return this.state; }
  @HostBinding('class') get hostClass() {
    return `${this.getToggleClass()} ${this.className}`;
  }

  getToggleClass(): string {
    let base = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none';
    base += ' hover:bg-muted hover:text-muted-foreground';
    base += ' disabled:pointer-events-none disabled:opacity-50';
    base += ' focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]';
    base += ' aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive';
    base += ' [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 [&_svg]:shrink-0';
    switch (this.variant) {
      case 'outline':
        base += ' border border-input bg-transparent hover:bg-accent hover:text-accent-foreground';
        break;
      default:
        base += ' bg-transparent';
    }
    switch (this.size) {
      case 'sm':
        base += ' h-8 px-1.5 min-w-8';
        break;
      case 'lg':
        base += ' h-10 px-2.5 min-w-10';
        break;
      default:
        base += ' h-9 px-2 min-w-9';
    }
    if (this.state === 'on') {
      base += ' bg-accent text-accent-foreground';
    }
    return base;
  }
}
