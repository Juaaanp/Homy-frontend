import { Component, Input } from '@angular/core';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';
  @Input() className = '';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  get hostClasses(): string {
    const variantClass = this.getVariantClass(this.variant);
    const sizeClass = this.getSizeClass(this.size);
    return ['btn', variantClass, sizeClass, this.className].filter(Boolean).join(' ');
  }

  private getVariantClass(v: ButtonVariant): string {
    switch (v) {
      case 'destructive':
        return 'btn--destructive';
      case 'outline':
        return 'btn--outline';
      case 'secondary':
        return 'btn--secondary';
      case 'ghost':
        return 'btn--ghost';
      case 'link':
        return 'btn--link';
      case 'default':
      default:
        return 'btn--default';
    }
  }

  private getSizeClass(s: ButtonSize): string {
    switch (s) {
      case 'sm':
        return 'btn--sm';
      case 'lg':
        return 'btn--lg';
      case 'icon':
        return 'btn--icon';
      case 'default':
      default:
        return 'btn--default-size';
    }
  }
}
