import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RadioGroupComponent } from './radio-group.component';

@Component({
  selector: 'app-radio-group-item',
  standalone: true,
  imports: [CommonModule],
  template: `<div [class]="hostClasses">
  <div class="form-check">
    <input
      class="form-check-input"
      type="radio"
      [name]="name"
      [disabled]="disabled || (group?.disabled ?? false)"
      [checked]="checked"
      (change)="onChange()"
      [attr.aria-invalid]="(group?.invalid ? true : null)"
    />
    <label class="form-check-label">
      <ng-content></ng-content>
    </label>
  </div>
</div>`,
  styles: [``]
})
export class RadioGroupItemComponent {
  readonly group = inject(RadioGroupComponent, { optional: true, self: true, host: true });

  /** Value associated with this radio item */
  @Input() value!: string;
  /** Disabled state for this item */
  @Input() disabled = false;
  /** Extra CSS classes */
  @Input() className = '';

  get name(): string {
    return this.group?.groupName || 'app-radio-group-unbound';
  }

  get checked(): boolean {
    return !!this.group && this.group.value === this.value;
  }

  onChange() {
    if (this.disabled || !this.group || this.group.disabled) return;
    this.group.select(this.value);
  }

  get hostClasses(): string {
    const parts = [this.className];
    return parts.filter(Boolean).join(' ');
  }
}
