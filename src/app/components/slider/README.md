# Slider Component

A fully accessible range slider component for Angular. This is a complete Angular adaptation of the React Shadcn/UI Slider component with native implementation (no Radix UI dependency).

## Features

- 🎯 **Single & Multiple Values**: Support for single value or range (multiple thumbs)
- 📐 **Horizontal & Vertical**: Both orientations supported
- ⌨️ **Keyboard Navigation**: Full keyboard support (arrows, page up/down, home/end)
- 👆 **Touch Support**: Works on touch devices
- 🎨 **Customizable**: Min, max, step values
- ♿ **Accessible**: ARIA attributes, keyboard navigation
- 📦 **Forms Integration**: Implements ControlValueAccessor
- 🎭 **Inverted Mode**: Support for inverted direction
- 🔒 **Disabled State**: Can be disabled

## Installation

The component is already included in your project under `src/app/components/slider/`.

```typescript
import { SliderComponent } from '@/app/components/slider';
```

## Basic Usage

### Single Value Slider

```html
<!-- Template-driven form -->
<app-slider 
  [(ngModel)]="volume"
  [min]="0"
  [max]="100"
  [step]="1">
</app-slider>

<p>Volume: {{ volume }}%</p>
```

```typescript
export class MyComponent {
  volume = 50;
}
```

### Reactive Forms

```html
<form [formGroup]="form">
  <app-slider 
    formControlName="price"
    [min]="0"
    [max]="1000"
    [step]="10">
  </app-slider>
  
  <p>Price: ${{ form.get('price')?.value }}</p>
</form>
```

```typescript
export class MyComponent {
  form = this.fb.group({
    price: [500]
  });

  constructor(private fb: FormBuilder) {}
}
```

### Range Slider (Multiple Values)

```html
<app-slider 
  [(ngModel)]="priceRange"
  [min]="0"
  [max]="1000"
  [step]="50">
</app-slider>

<p>Range: ${{ priceRange[0] }} - ${{ priceRange[1] }}</p>
```

```typescript
export class MyComponent {
  priceRange = [200, 800];
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider orientation |
| `disabled` | `boolean` | `false` | Disabled state |
| `inverted` | `boolean` | `false` | Invert direction |
| `className` | `string` | `''` | Additional CSS classes |
| `ngModel` | `number \| number[]` | - | Value (template-driven) |
| `formControlName` | `string` | - | Form control name (reactive) |

## Events

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `EventEmitter<number[]>` | Emits when value changes |
| `ngModelChange` | `EventEmitter<number \| number[]>` | ngModel two-way binding |

## Orientations

### Horizontal (Default)

```html
<app-slider 
  [orientation]="'horizontal'"
  [(ngModel)]="value">
</app-slider>
```

### Vertical

```html
<div style="height: 300px;">
  <app-slider 
    [orientation]="'vertical'"
    [(ngModel)]="value">
  </app-slider>
</div>
```

Note: For vertical sliders, ensure the parent container has a defined height.

## Examples

### Volume Control

```html
<div class="d-flex align-items-center gap-3">
  <svg><!-- Volume icon --></svg>
  <app-slider 
    [(ngModel)]="volume"
    [min]="0"
    [max]="100"
    class="flex-grow-1">
  </app-slider>
  <span class="text-muted">{{ volume }}%</span>
</div>
```

### Price Range Filter

```html
<div class="mb-3">
  <label class="form-label">Price Range</label>
  <app-slider 
    [(ngModel)]="priceRange"
    [min]="0"
    [max]="5000"
    [step]="100">
  </app-slider>
  <div class="d-flex justify-content-between mt-2">
    <span>${{ priceRange[0] }}</span>
    <span>${{ priceRange[1] }}</span>
  </div>
</div>
```

```typescript
export class ProductFilterComponent {
  priceRange = [500, 3000];
}
```

### Temperature Control

```html
<div class="card p-3">
  <h5 class="mb-3">Temperature: {{ temperature }}°C</h5>
  <app-slider 
    [(ngModel)]="temperature"
    [min]="16"
    [max]="30"
    [step]="0.5"
    [className]="getTemperatureClass()">
  </app-slider>
</div>
```

```typescript
export class ThermostatComponent {
  temperature = 22;

  getTemperatureClass(): string {
    if (this.temperature < 20) return 'slider-cold';
    if (this.temperature > 25) return 'slider-hot';
    return '';
  }
}
```

### Brightness Control (Vertical)

```html
<div class="d-flex justify-content-center" style="height: 200px;">
  <div class="d-flex flex-column align-items-center gap-2">
    <svg><!-- Sun icon --></svg>
    <app-slider 
      [orientation]="'vertical'"
      [(ngModel)]="brightness"
      [min]="0"
      [max]="100">
    </app-slider>
    <svg><!-- Moon icon --></svg>
  </div>
</div>
```

### Disabled State

```html
<app-slider 
  [(ngModel)]="value"
  [disabled]="true"
  [min]="0"
  [max]="100">
</app-slider>
```

### With Custom Step

```html
<!-- Snap to multiples of 25 -->
<app-slider 
  [(ngModel)]="value"
  [min]="0"
  [max]="100"
  [step]="25">
</app-slider>
```

### Inverted Direction

```html
<!-- Right to left (horizontal) or top to bottom (vertical) -->
<app-slider 
  [(ngModel)]="value"
  [inverted]="true">
</app-slider>
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| **Arrow Left/Down** | Decrease by step |
| **Arrow Right/Up** | Increase by step |
| **Page Down** | Decrease by 10% of range |
| **Page Up** | Increase by 10% of range |
| **Home** | Set to minimum value |
| **End** | Set to maximum value |
| **Tab** | Focus next/previous thumb |

## Touch Support

The slider is fully touch-enabled:
- Touch and drag to move thumb
- Works on mobile devices
- Multi-touch support for range sliders

## Accessibility

### ARIA Attributes

The component automatically includes:
- `role="slider"`
- `aria-valuemin`
- `aria-valuemax`
- `aria-valuenow`
- `aria-orientation`
- `aria-disabled`

### Screen Reader Friendly

```html
<div>
  <label id="volume-label" class="form-label">Volume</label>
  <app-slider 
    [(ngModel)]="volume"
    [attr.aria-labelledby]="'volume-label'">
  </app-slider>
</div>
```

## Styling Customization

### CSS Custom Properties

```css
/* In your component or global styles */
.custom-slider {
  --slider-track-height: 0.5rem;
  --slider-thumb-size: 1.25rem;
  --slider-color: #ff6b6b;
}

.custom-slider .slider-track {
  height: var(--slider-track-height);
  background-color: rgba(255, 107, 107, 0.2);
}

.custom-slider .slider-range {
  background-color: var(--slider-color);
}

.custom-slider .slider-thumb {
  width: var(--slider-thumb-size);
  height: var(--slider-thumb-size);
  border-color: var(--slider-color);
}
```

### Custom Color Schemes

```html
<!-- Success theme -->
<app-slider 
  [(ngModel)]="progress"
  [className]="'slider-success'">
</app-slider>

<!-- Warning theme -->
<app-slider 
  [(ngModel)]="warning"
  [className]="'slider-warning'">
</app-slider>
```

```css
.slider-success .slider-range {
  background-color: var(--bs-success);
}

.slider-success .slider-thumb {
  border-color: var(--bs-success);
}

.slider-warning .slider-range {
  background-color: var(--bs-warning);
}

.slider-warning .slider-thumb {
  border-color: var(--bs-warning);
}
```

## Form Validation

```html
<form [formGroup]="form">
  <div class="mb-3">
    <label class="form-label">Age</label>
    <app-slider 
      formControlName="age"
      [min]="18"
      [max]="100">
    </app-slider>
    <div *ngIf="form.get('age')?.invalid && form.get('age')?.touched" 
         class="text-danger mt-1">
      Age is required
    </div>
  </div>
</form>
```

```typescript
export class FormComponent {
  form = this.fb.group({
    age: [25, Validators.required]
  });

  constructor(private fb: FormBuilder) {}
}
```

## Advanced: Multi-Range with Labels

```html
<div class="slider-container">
  <app-slider 
    [(ngModel)]="range"
    [min]="0"
    [max]="100">
  </app-slider>
  <div class="slider-labels">
    <span>{{ range[0] }}</span>
    <span>{{ range[1] }}</span>
  </div>
</div>
```

```css
.slider-container {
  position: relative;
  padding-bottom: 2rem;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--bs-secondary);
}
```

## Complete Example: Audio Player

```html
<div class="audio-player card p-3">
  <!-- Volume -->
  <div class="mb-3">
    <label class="form-label d-flex align-items-center gap-2">
      <svg width="16" height="16"><!-- Volume icon --></svg>
      Volume
    </label>
    <app-slider 
      [(ngModel)]="volume"
      [min]="0"
      [max]="100"
      (valueChange)="onVolumeChange($event)">
    </app-slider>
  </div>

  <!-- Progress -->
  <div class="mb-3">
    <label class="form-label">Progress</label>
    <app-slider 
      [(ngModel)]="progress"
      [min]="0"
      [max]="duration"
      [disabled]="!isPlaying"
      (valueChange)="seek($event)">
    </app-slider>
    <div class="d-flex justify-content-between text-muted small mt-1">
      <span>{{ formatTime(progress) }}</span>
      <span>{{ formatTime(duration) }}</span>
    </div>
  </div>

  <!-- Balance -->
  <div>
    <label class="form-label">Balance</label>
    <app-slider 
      [(ngModel)]="balance"
      [min]="-100"
      [max]="100"
      [step]="1">
    </app-slider>
    <div class="text-center text-muted small mt-1">
      {{ balance > 0 ? 'R' : balance < 0 ? 'L' : 'Center' }}
    </div>
  </div>
</div>
```

```typescript
export class AudioPlayerComponent {
  volume = 75;
  progress = 0;
  duration = 180;
  balance = 0;
  isPlaying = false;

  onVolumeChange(value: number[]): void {
    console.log('Volume changed to:', value[0]);
  }

  seek(value: number[]): void {
    console.log('Seeking to:', value[0]);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Notes

- For vertical orientation, ensure parent container has a defined height
- The component automatically handles single or multiple values based on input
- Touch events are supported on mobile devices
- Keyboard navigation works with focus on thumb elements
- Respects `prefers-reduced-motion` for animations

## Differences from React Version

- **No Radix UI dependency**: Native implementation with DOM events
- **ControlValueAccessor**: Full Angular forms integration
- **ViewChild**: Uses Angular's template references
- **EventEmitters**: Angular-style event handling
- **Two-way binding**: ngModel support

Despite these differences, the API and behavior match the React version closely.

## License

MIT
