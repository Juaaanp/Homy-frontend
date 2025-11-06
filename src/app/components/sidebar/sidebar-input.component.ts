import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-sidebar-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input
      type="text"
      [value]="value"
      (input)="onInputChange($event)"
      (blur)="onTouched()"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [class]="className"
      class="sidebar-input"
    />
  `,
  styles: [`
    .sidebar-input {
      display: flex;
      height: 2rem;
      width: 100%;
      border-radius: 0.375rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background-color: transparent;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      outline: none;
      transition: border-color 0.2s;
    }

    .sidebar-input:focus {
      border-color: var(--bs-primary);
      box-shadow: 0 0 0 2px rgba(var(--bs-primary-rgb), 0.2);
    }

    .sidebar-input:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .sidebar-input::placeholder {
      color: rgba(0, 0, 0, 0.45);
    }

    :host-context([data-collapsible="icon"]) .sidebar-input {
      display: none;
    }
  `],
  host: {
    '[attr.data-slot]': '"sidebar-input"',
    '[attr.data-sidebar]': '"input"'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SidebarInputComponent),
      multi: true
    }
  ]
})
export class SidebarInputComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() className = '';
  
  value = '';
  disabled = false;
  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
