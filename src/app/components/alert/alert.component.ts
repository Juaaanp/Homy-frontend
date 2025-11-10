import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type AlertVariant = 'default' | 'destructive';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  /** Variant: 'default' or 'destructive' */
  @Input() variant: AlertVariant = 'default';

  /** Optional extra CSS class */
  @Input() className = '';

  get hostClasses() {
    const bsVariant = this.variant === 'destructive' ? 'danger' : 'primary';
    return ['alert', `alert-${bsVariant}`, this.className].filter(Boolean).join(' ');
  }
}
