# Skeleton Component

A loading placeholder component that displays an animated skeleton while content is loading. This is an Angular adaptation of the React Shadcn/UI Skeleton component.

## Features

- 🎨 **Pulse Animation**: Smooth pulsing effect
- 📦 **Utility Classes**: Pre-defined skeleton shapes
- 🎯 **Customizable**: Add custom classes for any shape
- ♿ **Accessible**: Respects `prefers-reduced-motion`
- 🎭 **Flexible**: Works as inline or block element
- 📱 **Responsive**: Adapts to container size

## Installation

The component is already included in your project under `src/app/components/skeleton/`.

```typescript
import { SkeletonComponent } from '@/app/components/skeleton';
```

## Basic Usage

```html
<!-- Basic skeleton -->
<app-skeleton></app-skeleton>

<!-- With custom classes -->
<app-skeleton [className]="'w-100 h-4'"></app-skeleton>

<!-- Multiple skeletons for text -->
<div class="d-flex flex-column gap-2">
  <app-skeleton [className]="'skeleton-title'"></app-skeleton>
  <app-skeleton [className]="'skeleton-text'"></app-skeleton>
  <app-skeleton [className]="'skeleton-text'"></app-skeleton>
</div>
```

## Preset Shapes

The component includes several utility classes for common skeleton shapes:

### Text Skeletons

```html
<!-- Small text line -->
<app-skeleton [className]="'skeleton-sm w-100'"></app-skeleton>

<!-- Normal text line -->
<app-skeleton [className]="'skeleton-text'"></app-skeleton>

<!-- Title -->
<app-skeleton [className]="'skeleton-title'"></app-skeleton>

<!-- Different sizes -->
<app-skeleton [className]="'skeleton-md w-75'"></app-skeleton>
<app-skeleton [className]="'skeleton-lg w-50'"></app-skeleton>
<app-skeleton [className]="'skeleton-xl w-100'"></app-skeleton>
```

### Shape Skeletons

```html
<!-- Avatar circle -->
<app-skeleton [className]="'skeleton-avatar'"></app-skeleton>

<!-- Button -->
<app-skeleton [className]="'skeleton-button'"></app-skeleton>

<!-- Card -->
<app-skeleton [className]="'skeleton-card'"></app-skeleton>

<!-- Custom rectangle -->
<app-skeleton [className]="'w-100'" style="height: 200px;"></app-skeleton>
```

## Common Patterns

### Card Loading

```html
<div class="card p-3">
  <div class="d-flex align-items-center gap-3 mb-3">
    <app-skeleton [className]="'skeleton-avatar'"></app-skeleton>
    <div class="flex-grow-1">
      <app-skeleton [className]="'skeleton-title mb-2'"></app-skeleton>
      <app-skeleton [className]="'skeleton-sm w-50'"></app-skeleton>
    </div>
  </div>
  <app-skeleton [className]="'skeleton-card'"></app-skeleton>
</div>
```

### List Loading

```html
<div class="d-flex flex-column gap-3">
  <div *ngFor="let item of [1,2,3]" class="d-flex align-items-center gap-2">
    <app-skeleton [className]="'skeleton-avatar'"></app-skeleton>
    <div class="flex-grow-1">
      <app-skeleton [className]="'skeleton-text mb-2'"></app-skeleton>
      <app-skeleton [className]="'skeleton-sm w-75'"></app-skeleton>
    </div>
  </div>
</div>
```

### Table Loading

```html
<table class="table">
  <thead>
    <tr>
      <th><app-skeleton [className]="'skeleton-sm'"></app-skeleton></th>
      <th><app-skeleton [className]="'skeleton-sm'"></app-skeleton></th>
      <th><app-skeleton [className]="'skeleton-sm'"></app-skeleton></th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let row of [1,2,3,4,5]">
      <td><app-skeleton [className]="'skeleton-text'"></app-skeleton></td>
      <td><app-skeleton [className]="'skeleton-text'"></app-skeleton></td>
      <td><app-skeleton [className]="'skeleton-text'"></app-skeleton></td>
    </tr>
  </tbody>
</table>
```

### Form Loading

```html
<form>
  <div class="mb-3">
    <app-skeleton [className]="'skeleton-sm w-25 mb-2'"></app-skeleton>
    <app-skeleton [className]="'skeleton-button w-100'"></app-skeleton>
  </div>
  <div class="mb-3">
    <app-skeleton [className]="'skeleton-sm w-25 mb-2'"></app-skeleton>
    <app-skeleton [className]="'skeleton-button w-100'"></app-skeleton>
  </div>
  <app-skeleton [className]="'skeleton-button'"></app-skeleton>
</form>
```

### Dashboard Loading

```html
<div class="row g-3">
  <!-- Stats cards -->
  <div class="col-md-3" *ngFor="let stat of [1,2,3,4]">
    <div class="card p-3">
      <app-skeleton [className]="'skeleton-sm w-50 mb-2'"></app-skeleton>
      <app-skeleton [className]="'skeleton-title'"></app-skeleton>
    </div>
  </div>
  
  <!-- Main chart -->
  <div class="col-12">
    <div class="card p-3">
      <app-skeleton [className]="'skeleton-title mb-3'"></app-skeleton>
      <app-skeleton style="height: 300px;"></app-skeleton>
    </div>
  </div>
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes to apply |

## Utility Classes

| Class | Description | Dimensions |
|-------|-------------|------------|
| `skeleton-text` | Standard text line | Height: 1rem, Width: 100% |
| `skeleton-title` | Larger title text | Height: 1.5rem, Width: 60% |
| `skeleton-avatar` | Circular avatar | 2.5rem × 2.5rem (circle) |
| `skeleton-button` | Button shape | Height: 2.5rem, Width: 5rem |
| `skeleton-card` | Card placeholder | Height: 8rem, Width: 100% |
| `skeleton-sm` | Small height | Height: 0.75rem |
| `skeleton-md` | Medium height | Height: 1rem |
| `skeleton-lg` | Large height | Height: 1.5rem |
| `skeleton-xl` | Extra large height | Height: 2rem |

## Custom Styling

You can combine the component with Bootstrap utility classes or custom styles:

```html
<!-- Bootstrap utilities -->
<app-skeleton [className]="'w-100 mb-3'" style="height: 150px;"></app-skeleton>
<app-skeleton [className]="'w-75 mx-auto'"></app-skeleton>
<app-skeleton [className]="'rounded-pill'" style="width: 100px; height: 100px;"></app-skeleton>

<!-- Custom inline styles -->
<app-skeleton 
  [className]="'rounded'" 
  [style.width.px]="300" 
  [style.height.px]="200">
</app-skeleton>
```

## With Conditional Loading

```typescript
@Component({
  selector: 'app-user-profile',
  template: `
    <div class="card p-3">
      @if (loading) {
        <div class="d-flex align-items-center gap-3">
          <app-skeleton [className]="'skeleton-avatar'"></app-skeleton>
          <div class="flex-grow-1">
            <app-skeleton [className]="'skeleton-title mb-2'"></app-skeleton>
            <app-skeleton [className]="'skeleton-text w-75'"></app-skeleton>
          </div>
        </div>
      } @else {
        <div class="d-flex align-items-center gap-3">
          <img [src]="user.avatar" class="rounded-circle" width="40" height="40">
          <div>
            <h5>{{ user.name }}</h5>
            <p class="text-muted mb-0">{{ user.email }}</p>
          </div>
        </div>
      }
    </div>
  `
})
export class UserProfileComponent {
  loading = true;
  user: User | null = null;

  ngOnInit() {
    this.loadUser();
  }

  async loadUser() {
    this.loading = true;
    this.user = await this.userService.getUser();
    this.loading = false;
  }
}
```

## Animation

The skeleton uses a CSS pulse animation that:
- Smoothly fades between 100% and 50% opacity
- Runs infinitely with a 2-second duration
- Uses cubic-bezier easing for smooth motion
- Automatically disables when user has `prefers-reduced-motion` enabled

## Accessibility

- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` by disabling animation
- **Semantic**: Can be combined with ARIA attributes when needed
- **Screen Readers**: Consider adding `aria-busy="true"` to parent container during loading

```html
<div [attr.aria-busy]="loading" role="region" aria-label="Loading content">
  @if (loading) {
    <app-skeleton [className]="'skeleton-card'"></app-skeleton>
  } @else {
    <!-- Content -->
  }
</div>
```

## Customizing Animation

To customize the animation, override the CSS in your global styles:

```css
/* Faster animation */
.skeleton-base {
  animation-duration: 1s;
}

/* Shimmer effect */
@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-base {
  background: linear-gradient(
    90deg,
    rgba(var(--bs-primary-rgb), 0.1) 25%,
    rgba(var(--bs-primary-rgb), 0.2) 50%,
    rgba(var(--bs-primary-rgb), 0.1) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 2s linear infinite;
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Notes

- The skeleton uses `rgba(var(--bs-primary-rgb), 0.1)` for the background, ensuring it matches your theme
- All animations respect the user's motion preferences
- Combine with Bootstrap spacing utilities for layout (`mb-3`, `gap-2`, etc.)
- The component is lightweight with no external dependencies

## License

MIT
