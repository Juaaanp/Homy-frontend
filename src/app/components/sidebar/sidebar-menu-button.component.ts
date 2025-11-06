import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'default' | 'outline';
type ButtonSize = 'default' | 'sm' | 'lg';

@Component({
  selector: 'app-sidebar-menu-button',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styleUrls: ['./sidebar-menu-button.component.css'],
  host: {
    '[attr.data-slot]': '"sidebar-menu-button"',
    '[attr.data-sidebar]': '"menu-button"',
    'class': 'peer/menu-button'
  }
})
export class SidebarMenuButtonComponent {
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';
  @Input() isActive = false;
  @Input() className = '';

  @HostBinding('class')
  get hostClasses() {
    const baseClasses = 'flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground';
    const variantClass = this.getVariantClass();
    const sizeClass = this.getSizeClass();
    const activeClass = this.isActive ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground' : '';
    
    return [baseClasses, variantClass, sizeClass, activeClass, this.className].filter(Boolean).join(' ');
  }

  @HostBinding('attr.data-size')
  get dataSize() {
    return this.size;
  }

  @HostBinding('attr.data-active')
  get dataActive() {
    return this.isActive;
  }

  private getVariantClass(): string {
    if (this.variant === 'outline') {
      return 'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))]';
    }
    return '';
  }

  private getSizeClass(): string {
    switch (this.size) {
      case 'sm':
        return 'h-7 text-xs';
      case 'lg':
        return 'h-12 text-sm';
      default:
        return 'h-8 text-sm';
    }
  }
}
