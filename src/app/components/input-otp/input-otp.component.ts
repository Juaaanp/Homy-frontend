import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-otp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="containerClassName || ''" (click)="focusFirstEmpty()">
      <input
        #otpInput
        *ngFor="let slot of slots; let i = index"
        [attr.inputmode]="'numeric'"
        [disabled]="disabled"
        [class]="className || ''"
        type="text"
        maxlength="1"
        (input)="onInput($event, i)"
        (keydown)="onKeyDown($event, i)"
        (paste)="onPaste($event)"
        [value]="slots[i] || ''"
      />
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputOTPComponent),
      multi: true,
    },
  ],
})
export class InputOTPComponent implements OnInit, ControlValueAccessor {
  @Input() length = 6;
  @Input() disabled = false;
  @Input() containerClassName?: string;
  @Input() className?: string;

  @Output() valueChange = new EventEmitter<string>();

  @ViewChildren('otpInput', { read: ElementRef }) inputs!: QueryList<ElementRef<HTMLInputElement>>;

  slots: string[] = [];

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.slots = Array.from({ length: this.length }).map(() => '');
  }

  writeValue(value: any): void {
    const str = (value ?? '') + '';
    this.slots = Array.from({ length: this.length }).map((_, i) => str[i] ?? '');
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

  private emitValue() {
    const val = this.slots.join('').trim();
    this.onChange(val);
    this.valueChange.emit(val);
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const v = input.value.replace(/\s+/g, '').slice(-1);
    this.slots[index] = v;
    input.value = v;
    if (v && index < this.length - 1) {
      const list = this.inputs.toArray();
      setTimeout(() => list[index + 1].nativeElement.focus());
    }
    this.emitValue();
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && !input.value && index > 0) {
      event.preventDefault();
      const list = this.inputs.toArray();
      list[index - 1].nativeElement.focus();
      this.slots[index - 1] = '';
      this.emitValue();
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      (this.inputs.toArray()[index - 1].nativeElement as HTMLInputElement).focus();
    }
    if (event.key === 'ArrowRight' && index < this.length - 1) {
      (this.inputs.toArray()[index + 1].nativeElement as HTMLInputElement).focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const text = event.clipboardData?.getData('text') ?? '';
    const chars = text.replace(/\s+/g, '').split('').slice(0, this.length);
    for (let i = 0; i < this.length; i++) {
      this.slots[i] = chars[i] ?? '';
      const el = this.inputs.toArray()[i];
      if (el) el.nativeElement.value = this.slots[i];
    }
    this.emitValue();
  }

  focusFirstEmpty() {
    const list = this.inputs.toArray();
    const idx = this.slots.findIndex(s => !s);
    const target = idx === -1 ? this.length - 1 : idx;
    list[target]?.nativeElement.focus();
  }
}
