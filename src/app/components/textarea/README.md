# Textarea Component

A textarea component for multi-line text input in Angular. This is a complete Angular adaptation of the React Shadcn/UI Textarea component with form integration.

## Features

- 📝 **Multi-line Input**: Standard textarea for longer text
- 📦 **Forms Integration**: Implements ControlValueAccessor
- 🎨 **Size Variants**: Small, default, and large sizes
- 🔄 **Auto-resize**: Optional automatic height adjustment
- ⚠️ **Validation States**: Visual feedback for errors
- 🔒 **Disabled/Readonly**: Support for both states
- 📏 **Character Count**: Built-in maxlength support
- ♿ **Accessible**: ARIA attributes for screen readers
- 🌙 **Dark Mode**: Automatic dark mode support
- 📱 **Responsive**: Adapts to screen size

## Installation

The component is already included in your project under `src/app/components/textarea/`.

```typescript
import { TextareaComponent } from '@/app/components/textarea';
```

## Basic Usage

### Template-Driven Forms

```html
<app-textarea
  [(ngModel)]="description"
  [placeholder]="'Enter your description...'"
  [rows]="4">
</app-textarea>

<p>Length: {{ description.length }}</p>
```

```typescript
export class MyComponent {
  description = '';
}
```

### Reactive Forms

```html
<form [formGroup]="form">
  <app-textarea
    formControlName="comments"
    [placeholder]="'Enter your comments...'"
    [rows]="5">
  </app-textarea>
</form>
```

```typescript
export class MyComponent {
  form = this.fb.group({
    comments: ['', [Validators.required, Validators.maxLength(500)]]
  });

  constructor(private fb: FormBuilder) {}
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `''` | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `rows` | `number` | `4` | Number of visible rows |
| `minRows` | `number` | `2` | Minimum rows (with autoResize) |
| `maxRows` | `number` | - | Maximum rows (with autoResize) |
| `autoResize` | `boolean` | `false` | Auto-adjust height |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | `''` | Input ID |
| `name` | `string` | `''` | Input name |
| `required` | `boolean` | `false` | Required field |
| `maxlength` | `number` | - | Maximum characters |
| `ngModel` | `string` | - | Value (template-driven) |
| `formControlName` | `string` | - | Form control name (reactive) |

## Examples

### Basic Textarea

```html
<div class="mb-3">
  <label for="bio" class="form-label">Biography</label>
  <app-textarea
    id="bio"
    [(ngModel)]="bio"
    [placeholder]="'Tell us about yourself...'"
    [rows]="6">
  </app-textarea>
</div>
```

### With Character Limit

```html
<div class="mb-3">
  <label class="form-label">Description (max 200 characters)</label>
  <app-textarea
    [(ngModel)]="description"
    [maxlength]="200"
    [placeholder]="'Enter description...'">
  </app-textarea>
  <small class="text-muted">
    {{ description.length }}/200 characters
  </small>
</div>
```

### With Validation

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div class="mb-3">
    <label class="form-label">Comments *</label>
    <app-textarea
      formControlName="comments"
      [placeholder]="'Enter your comments...'"
      [required]="true"
      [attr.aria-invalid]="form.get('comments')?.invalid && form.get('comments')?.touched">
    </app-textarea>
    <div 
      *ngIf="form.get('comments')?.invalid && form.get('comments')?.touched"
      class="text-danger mt-1 small">
      <div *ngIf="form.get('comments')?.errors?.['required']">
        Comments are required
      </div>
      <div *ngIf="form.get('comments')?.errors?.['minlength']">
        Comments must be at least 10 characters
      </div>
    </div>
  </div>

  <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
    Submit
  </button>
</form>
```

```typescript
export class Component {
  form = this.fb.group({
    comments: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500)
    ]]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Submitted:', this.form.value);
    }
  }
}
```

### Auto-resize

```html
<app-textarea
  [(ngModel)]="message"
  [autoResize]="true"
  [minRows]="3"
  [maxRows]="10"
  [placeholder]="'Type your message...'">
</app-textarea>
```

### Size Variants

```html
<!-- Small -->
<app-textarea
  [(ngModel)]="notes"
  [className]="'textarea-sm'"
  [placeholder]="'Quick notes...'">
</app-textarea>

<!-- Default -->
<app-textarea
  [(ngModel)]="description"
  [placeholder]="'Description...'">
</app-textarea>

<!-- Large -->
<app-textarea
  [(ngModel)]="essay"
  [className]="'textarea-lg'"
  [placeholder]="'Write your essay...'">
</app-textarea>
```

### Disabled State

```html
<app-textarea
  [(ngModel)]="value"
  [disabled]="true"
  [placeholder]="'This field is disabled'">
</app-textarea>
```

### Readonly State

```html
<app-textarea
  [value]="existingContent"
  [readonly]="true"
  [rows]="8">
</app-textarea>
```

### No Resize

```html
<app-textarea
  [(ngModel)]="fixedText"
  [className]="'textarea-no-resize'"
  [rows]="5">
</app-textarea>
```

### Contact Form

```html
<form [formGroup]="contactForm" (ngSubmit)="sendMessage()">
  <div class="row">
    <div class="col-md-6 mb-3">
      <label class="form-label">Name *</label>
      <input type="text" class="form-control" formControlName="name">
    </div>
    <div class="col-md-6 mb-3">
      <label class="form-label">Email *</label>
      <input type="email" class="form-control" formControlName="email">
    </div>
  </div>

  <div class="mb-3">
    <label class="form-label">Subject *</label>
    <input type="text" class="form-control" formControlName="subject">
  </div>

  <div class="mb-3">
    <label class="form-label">Message *</label>
    <app-textarea
      formControlName="message"
      [placeholder]="'Type your message here...'"
      [rows]="6"
      [required]="true"
      [attr.aria-invalid]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched">
    </app-textarea>
    <small class="text-muted">
      {{ contactForm.get('message')?.value?.length || 0 }}/1000 characters
    </small>
  </div>

  <button type="submit" class="btn btn-primary" [disabled]="contactForm.invalid">
    Send Message
  </button>
</form>
```

```typescript
export class ContactFormComponent {
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.maxLength(1000)]]
  });

  constructor(private fb: FormBuilder) {}

  sendMessage(): void {
    if (this.contactForm.valid) {
      console.log('Sending:', this.contactForm.value);
      // API call here
    }
  }
}
```

### Review Form

```html
<div class="card p-4">
  <h4 class="mb-3">Write a Review</h4>
  
  <form [formGroup]="reviewForm" (ngSubmit)="submitReview()">
    <div class="mb-3">
      <label class="form-label">Rating *</label>
      <div class="d-flex gap-2">
        <button 
          *ngFor="let star of [1,2,3,4,5]"
          type="button"
          class="btn btn-sm"
          [class.btn-warning]="star <= rating"
          [class.btn-outline-secondary]="star > rating"
          (click)="setRating(star)">
          ★
        </button>
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label">Review Title *</label>
      <input 
        type="text" 
        class="form-control" 
        formControlName="title"
        placeholder="Summarize your experience">
    </div>

    <div class="mb-3">
      <label class="form-label">Your Review *</label>
      <app-textarea
        formControlName="content"
        [placeholder]="'Share your thoughts about this product...'"
        [rows]="6"
        [maxlength]="500"
        [required]="true">
      </app-textarea>
      <div class="d-flex justify-content-between mt-1">
        <small 
          class="text-danger" 
          *ngIf="reviewForm.get('content')?.invalid && reviewForm.get('content')?.touched">
          Review is required (minimum 20 characters)
        </small>
        <small class="text-muted ms-auto">
          {{ reviewForm.get('content')?.value?.length || 0 }}/500
        </small>
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label">
        <input type="checkbox" formControlName="recommend" class="me-2">
        I recommend this product
      </label>
    </div>

    <button 
      type="submit" 
      class="btn btn-primary"
      [disabled]="reviewForm.invalid || rating === 0">
      Submit Review
    </button>
  </form>
</div>
```

```typescript
export class ReviewFormComponent {
  rating = 0;
  
  reviewForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]],
    recommend: [false]
  });

  constructor(private fb: FormBuilder) {}

  setRating(star: number): void {
    this.rating = star;
  }

  submitReview(): void {
    if (this.reviewForm.valid && this.rating > 0) {
      const review = {
        ...this.reviewForm.value,
        rating: this.rating
      };
      console.log('Submitting review:', review);
    }
  }
}
```

### Code Editor Style

```html
<div class="mb-3">
  <label class="form-label d-flex justify-content-between">
    <span>Code Snippet</span>
    <button type="button" class="btn btn-sm btn-link" (click)="formatCode()">
      Format
    </button>
  </label>
  <app-textarea
    [(ngModel)]="code"
    [className]="'textarea-no-resize font-monospace'"
    [rows]="12"
    [placeholder]="'Paste your code here...'"
    style="background-color: #1e1e1e; color: #d4d4d4;">
  </app-textarea>
</div>
```

### Character Counter with Progress

```html
<div class="mb-3">
  <label class="form-label">Bio</label>
  <app-textarea
    [(ngModel)]="bio"
    [maxlength]="200"
    [placeholder]="'Tell us about yourself...'">
  </app-textarea>
  
  <div class="mt-2">
    <div class="progress" style="height: 4px;">
      <div 
        class="progress-bar"
        [class.bg-success]="bioProgress < 80"
        [class.bg-warning]="bioProgress >= 80 && bioProgress < 100"
        [class.bg-danger]="bioProgress >= 100"
        [style.width.%]="bioProgress">
      </div>
    </div>
    <small class="text-muted">{{ bio.length }}/200 characters</small>
  </div>
</div>
```

```typescript
export class Component {
  bio = '';

  get bioProgress(): number {
    return (this.bio.length / 200) * 100;
  }
}
```

## Accessibility

### ARIA Attributes

```html
<!-- With label -->
<label for="feedback" class="form-label">Feedback</label>
<app-textarea
  id="feedback"
  [(ngModel)]="feedback"
  [required]="true"
  [attr.aria-describedby]="'feedback-help'">
</app-textarea>
<small id="feedback-help" class="text-muted">
  Please provide detailed feedback
</small>

<!-- Invalid state -->
<app-textarea
  [(ngModel)]="value"
  [attr.aria-invalid]="isInvalid"
  [attr.aria-errormessage]="'error-message'">
</app-textarea>
<div id="error-message" class="text-danger" *ngIf="isInvalid">
  This field has an error
</div>
```

## Styling

### Custom Styles

```css
/* In your component styles */
::ng-deep .custom-textarea {
  border-radius: 1rem;
  border-width: 2px;
}

::ng-deep .custom-textarea:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}
```

### Monospace Font

```html
<app-textarea
  [(ngModel)]="code"
  [className]="'font-monospace'"
  style="font-size: 0.875rem; line-height: 1.6;">
</app-textarea>
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Notes

- The textarea uses `resize: vertical` by default (can be changed with `textarea-no-resize` class)
- Auto-resize feature dynamically adjusts height based on content
- Works seamlessly with Angular forms (both template-driven and reactive)
- Supports all standard HTML textarea attributes
- Character count can be tracked with `maxlength` prop
- Scrollbar is styled for better appearance

## Differences from React Version

- **ControlValueAccessor**: Full Angular forms integration
- **Auto-resize**: Optional feature with min/max rows
- **EventEmitters**: Angular-style event handling
- **Two-way binding**: ngModel support

Despite these differences, the API and behavior match the React version closely.

## License

MIT
