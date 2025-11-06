import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  template: `<div
  [class]="hostClasses"
  role="progressbar"
  [attr.aria-valuemin]="min"
  [attr.aria-valuemax]="max"
  [attr.aria-valuenow]="clamped"
  data-slot="progress"
>
  <div
    class="progress-bar"
    data-slot="progress-indicator"
    [style.width.%]="percent"
  ></div>
</div>`,
  styles: [``]
})
export class ProgressComponent {
  /** Current value (between min and max). */
  @Input() value = 0;
  /** Minimum value. */
  @Input() min = 0;
  /** Maximum value. */
  @Input() max = 100;
  /** Optional additional CSS classes for the outer element. */
  @Input() className = '';

  get clamped(): number {
    const v = Number.isFinite(this.value) ? this.value : 0;
    return Math.min(this.max, Math.max(this.min, v));
  }

  get percent(): number {
    const span = this.max - this.min || 1;
    return ((this.clamped - this.min) / span) * 100;
  }

  get hostClasses(): string {
    // Bootstrap progress container
    return ['progress', this.className].filter(Boolean).join(' ');
  }
}
