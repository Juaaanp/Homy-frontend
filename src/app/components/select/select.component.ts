import { Component, forwardRef, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type SelectSize = 'sm' | 'default';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() size: SelectSize = 'default';
  @Input() className = '';
  @Input() placeholder = 'Select an option';
  @Input() disabled = false;
  @Input() ariaInvalid: boolean | null = null;

  value: any = '';

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'select';
  }

  get hostClasses(): string {
    const baseClasses =
      'border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50';
    const sizeClass = this.size === 'sm' ? 'h-8' : 'h-9';
    return [baseClasses, sizeClass, this.className].filter(Boolean).join(' ');
  }

  // ControlValueAccessor callbacks
  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(obj: any): void {
    this.value = obj ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleChange(e: Event): void {
    const select = e.target as HTMLSelectElement;
    this.value = select.value;
    this.onChange(this.value);
    this.onTouched();
  }

  handleBlur(): void {
    this.onTouched();
  }
}
