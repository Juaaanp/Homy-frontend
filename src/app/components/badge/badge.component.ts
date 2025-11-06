import { Component, Input, HostBinding } from '@angular/core';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

@Component({
  selector: 'app-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
  host: {
    'aria-hidden': 'false'
  }
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() className = '';

  @HostBinding('class') get hostClasses(): string {
    const base = 'badge';
    const variantClass = this.getVariantClass(this.variant);
    return [base, variantClass, this.className].filter(Boolean).join(' ');
  }

  private getVariantClass(v: BadgeVariant): string {
    switch (v) {
      case 'secondary':
        return 'text-bg-secondary';
      case 'destructive':
        return 'text-bg-danger';
      case 'outline':
        return 'border border-secondary text-secondary bg-transparent';
      case 'default':
      default:
        return 'text-bg-primary';
    }
  }
}
