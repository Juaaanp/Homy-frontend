import { Component, Input, Output, EventEmitter, forwardRef, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ],
  host: {
    '[attr.data-slot]': '"slider"',
    '[attr.data-disabled]': 'disabled',
    '[attr.data-orientation]': 'orientation'
  }
})
export class SliderComponent implements ControlValueAccessor, AfterViewInit {
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() disabled = false;
  @Input() className = '';
  @Input() inverted = false;
  
  @Output() valueChange = new EventEmitter<number[]>();
  
  @ViewChild('track', { static: false }) trackRef!: ElementRef<HTMLDivElement>;

  values: number[] = [50];
  activeThumbIndex: number | null = null;
  private onChange: (value: number[]) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterViewInit() {
    this.updateRangePosition();
  }

  writeValue(value: number | number[]): void {
    if (value === null || value === undefined) {
      this.values = [this.min];
    } else if (Array.isArray(value)) {
      this.values = value.map(v => this.clampValue(v));
    } else {
      this.values = [this.clampValue(value)];
    }
    setTimeout(() => this.updateRangePosition(), 0);
  }

  registerOnChange(fn: (value: number[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private clampValue(value: number): number {
    return Math.max(this.min, Math.min(this.max, value));
  }

  onThumbMouseDown(event: MouseEvent, index: number): void {
    if (this.disabled) return;
    
    event.preventDefault();
    this.activeThumbIndex = index;
    this.onTouched();
    
    const moveHandler = (e: MouseEvent) => this.onMouseMove(e);
    const upHandler = () => {
      this.activeThumbIndex = null;
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };
    
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  }

  onThumbTouchStart(event: TouchEvent, index: number): void {
    if (this.disabled) return;
    
    this.activeThumbIndex = index;
    this.onTouched();
    
    const moveHandler = (e: TouchEvent) => this.onTouchMove(e);
    const endHandler = () => {
      this.activeThumbIndex = null;
      document.removeEventListener('touchmove', moveHandler);
      document.removeEventListener('touchend', endHandler);
    };
    
    document.addEventListener('touchmove', moveHandler);
    document.addEventListener('touchend', endHandler);
  }

  onTrackClick(event: MouseEvent): void {
    if (this.disabled || !this.trackRef) return;
    
    const rect = this.trackRef.nativeElement.getBoundingClientRect();
    const newValue = this.getValueFromPosition(event, rect);
    
    // Find closest thumb
    const closestIndex = this.findClosestThumb(newValue);
    this.values[closestIndex] = newValue;
    
    this.updateValue();
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.activeThumbIndex === null || !this.trackRef) return;
    
    const rect = this.trackRef.nativeElement.getBoundingClientRect();
    const newValue = this.getValueFromPosition(event, rect);
    
    this.values[this.activeThumbIndex] = newValue;
    this.updateValue();
  }

  private onTouchMove(event: TouchEvent): void {
    if (this.activeThumbIndex === null || !this.trackRef || event.touches.length === 0) return;
    
    const rect = this.trackRef.nativeElement.getBoundingClientRect();
    const touch = event.touches[0];
    const newValue = this.getValueFromPosition(touch, rect);
    
    this.values[this.activeThumbIndex] = newValue;
    this.updateValue();
  }

  private getValueFromPosition(event: { clientX: number; clientY: number }, rect: DOMRect): number {
    let percentage: number;
    
    if (this.orientation === 'horizontal') {
      percentage = (event.clientX - rect.left) / rect.width;
      if (this.inverted) percentage = 1 - percentage;
    } else {
      percentage = 1 - (event.clientY - rect.top) / rect.height;
      if (this.inverted) percentage = 1 - percentage;
    }
    
    percentage = Math.max(0, Math.min(1, percentage));
    const rawValue = this.min + percentage * (this.max - this.min);
    const steppedValue = Math.round(rawValue / this.step) * this.step;
    
    return this.clampValue(steppedValue);
  }

  private findClosestThumb(value: number): number {
    let closestIndex = 0;
    let minDistance = Math.abs(this.values[0] - value);
    
    for (let i = 1; i < this.values.length; i++) {
      const distance = Math.abs(this.values[i] - value);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    
    return closestIndex;
  }

  private updateValue(): void {
    this.updateRangePosition();
    this.onChange(this.values);
    this.valueChange.emit(this.values);
  }

  private updateRangePosition(): void {
    // This will be used by the template to calculate range width/height
  }

  getThumbPosition(index: number): number {
    const percentage = ((this.values[index] - this.min) / (this.max - this.min)) * 100;
    return this.inverted ? 100 - percentage : percentage;
  }

  getRangeStart(): number {
    if (this.values.length === 0) return 0;
    const minValue = Math.min(...this.values);
    return ((minValue - this.min) / (this.max - this.min)) * 100;
  }

  getRangeEnd(): number {
    if (this.values.length === 0) return 0;
    const maxValue = Math.max(...this.values);
    return ((maxValue - this.min) / (this.max - this.min)) * 100;
  }

  getRangeSize(): number {
    return this.getRangeEnd() - this.getRangeStart();
  }

  onThumbKeyDown(event: KeyboardEvent, index: number): void {
    if (this.disabled) return;
    
    let delta = 0;
    
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        delta = -this.step;
        event.preventDefault();
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        delta = this.step;
        event.preventDefault();
        break;
      case 'PageDown':
        delta = -(this.max - this.min) / 10;
        event.preventDefault();
        break;
      case 'PageUp':
        delta = (this.max - this.min) / 10;
        event.preventDefault();
        break;
      case 'Home':
        this.values[index] = this.min;
        this.updateValue();
        event.preventDefault();
        return;
      case 'End':
        this.values[index] = this.max;
        this.updateValue();
        event.preventDefault();
        return;
    }
    
    if (delta !== 0) {
      this.values[index] = this.clampValue(this.values[index] + delta);
      this.updateValue();
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
