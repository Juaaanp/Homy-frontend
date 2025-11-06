# Toaster Component

A beautiful toast notification system for Angular, inspired by Sonner. Features rich colors, promises support, loading states, and full customization.

## Features

- 🎨 **Rich Colors**: Type-specific color schemes (success, error, warning, info)
- 📦 **Multiple Types**: success, error, warning, info, loading, default
- ⚡ **Promise Support**: Automatic loading → success/error handling
- 🎯 **Positioning**: 6 position options
- ⏱️ **Auto Dismiss**: Configurable duration
- 🎭 **Actions**: Add action and cancel buttons
- 📱 **Responsive**: Mobile-friendly
- ♿ **Accessible**: ARIA attributes and keyboard support
- 🌙 **Dark Mode**: Automatic dark mode support
- 🎬 **Animations**: Smooth slide-in animations

## Installation

The component is already included in your project under `src/app/components/toaster/`.

```typescript
import { ToasterComponent, ToasterService } from '@/app/components/toaster';
```

## Setup

### 1. Add Toaster to Your App

Add the `<app-toaster>` component to your root `app.component.html`:

```html
<!-- src/app/services/app.html -->
<router-outlet></router-outlet>
<app-toaster></app-toaster>
```

Or in your app component:

```typescript
import { Component } from '@angular/core';
import { ToasterComponent } from './components/toaster';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToasterComponent],
  template: `
    <router-outlet></router-outlet>
    <app-toaster [position]="'bottom-right'"></app-toaster>
  `
})
export class AppComponent {}
```

### 2. Inject Service in Your Components

```typescript
import { Component, inject } from '@angular/core';
import { ToasterService } from '@/app/components/toaster';

@Component({...})
export class MyComponent {
  private toaster = inject(ToasterService);

  showToast() {
    this.toaster.success('Success!', 'Your changes have been saved');
  }
}
```

## Basic Usage

### Success Toast

```typescript
this.toaster.success('Success!', 'Your profile has been updated');
```

### Error Toast

```typescript
this.toaster.error('Error!', 'Failed to save changes');
```

### Warning Toast

```typescript
this.toaster.warning('Warning!', 'Your session will expire soon');
```

### Info Toast

```typescript
this.toaster.info('Info', 'New features available!');
```

### Loading Toast

```typescript
const loadingId = this.toaster.loading('Loading...', 'Please wait');

// Later, dismiss it
this.toaster.dismiss(loadingId);
```

### Default Toast

```typescript
this.toaster.default('Notification', 'You have a new message');
```

## Toaster Component Props

```html
<app-toaster
  [position]="'bottom-right'"
  [richColors]="true"
  [expand]="false"
  [closeButton]="false">
</app-toaster>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `ToastPosition` | `'bottom-right'` | Toast position |
| `richColors` | `boolean` | `true` | Enable type-specific colors |
| `expand` | `boolean` | `false` | Expand to full width |
| `closeButton` | `boolean` | `false` | Show close button on all toasts |

### Position Options

- `'top-left'`
- `'top-center'`
- `'top-right'`
- `'bottom-left'`
- `'bottom-center'`
- `'bottom-right'`

## Advanced Usage

### With Actions

```typescript
this.toaster.success('File deleted', 'The file has been removed', {
  action: {
    label: 'Undo',
    onClick: () => {
      console.log('Undo clicked');
    }
  }
});
```

### With Cancel Button

```typescript
this.toaster.warning('Confirm action', 'Are you sure?', {
  duration: 0, // Don't auto-dismiss
  action: {
    label: 'Confirm',
    onClick: () => this.confirmAction()
  },
  cancel: {
    label: 'Cancel',
    onClick: () => console.log('Cancelled')
  }
});
```

### Custom Duration

```typescript
// Show for 10 seconds
this.toaster.success('Success!', 'This will stay for 10 seconds', {
  duration: 10000
});

// Never auto-dismiss
this.toaster.info('Important', 'This stays until dismissed', {
  duration: 0
});
```

### Update Toast

```typescript
const toastId = this.toaster.loading('Uploading...');

// Later, update it
this.toaster.update(toastId, {
  type: 'success',
  title: 'Uploaded!',
  description: 'File uploaded successfully',
  duration: 3000
});
```

### Promise Helper

Automatically show loading → success/error:

```typescript
this.toaster.promise(
  this.userService.updateProfile(data),
  {
    loading: 'Updating profile...',
    success: 'Profile updated successfully!',
    error: 'Failed to update profile'
  }
);

// With dynamic messages
this.toaster.promise(
  this.fileService.upload(file),
  {
    loading: 'Uploading file...',
    success: (result) => `Uploaded ${result.filename} successfully!`,
    error: (err) => `Upload failed: ${err.message}`
  }
);
```

### Dismiss Methods

```typescript
// Dismiss specific toast
const id = this.toaster.success('Message');
this.toaster.dismiss(id);

// Dismiss all toasts
this.toaster.dismissAll();
```

## Complete Examples

### Form Submission

```typescript
export class FormComponent {
  private toaster = inject(ToasterService);

  async onSubmit(form: FormData) {
    try {
      await this.toaster.promise(
        this.api.submit(form),
        {
          loading: 'Submitting form...',
          success: 'Form submitted successfully!',
          error: 'Failed to submit form'
        }
      );
      
      this.router.navigate(['/success']);
    } catch (error) {
      // Error toast already shown by promise helper
    }
  }
}
```

### File Upload with Progress

```typescript
export class UploadComponent {
  private toaster = inject(ToasterService);

  async uploadFile(file: File) {
    const toastId = this.toaster.loading(
      'Uploading...',
      `Uploading ${file.name}`
    );

    try {
      const result = await this.fileService.upload(file);
      
      this.toaster.update(toastId, {
        type: 'success',
        title: 'Upload complete!',
        description: `${file.name} uploaded successfully`,
        duration: 3000
      });
    } catch (error) {
      this.toaster.update(toastId, {
        type: 'error',
        title: 'Upload failed',
        description: error.message,
        duration: 5000
      });
    }
  }
}
```

### Delete Confirmation

```typescript
export class ItemListComponent {
  private toaster = inject(ToasterService);

  confirmDelete(item: Item) {
    this.toaster.warning(
      'Delete item?',
      `Are you sure you want to delete "${item.name}"?`,
      {
        duration: 0,
        action: {
          label: 'Delete',
          onClick: () => this.deleteItem(item.id)
        },
        cancel: {
          label: 'Cancel',
          onClick: () => console.log('Cancelled')
        }
      }
    );
  }

  async deleteItem(id: string) {
    await this.toaster.promise(
      this.api.deleteItem(id),
      {
        loading: 'Deleting...',
        success: 'Item deleted successfully',
        error: 'Failed to delete item'
      }
    );
  }
}
```

### Network Status

```typescript
export class NetworkMonitorComponent implements OnInit {
  private toaster = inject(ToasterService);

  ngOnInit() {
    window.addEventListener('online', () => {
      this.toaster.success('Back online', 'Connection restored');
    });

    window.addEventListener('offline', () => {
      this.toaster.error(
        'No connection',
        'Check your internet connection',
        { duration: 0 }
      );
    });
  }
}
```

### API Error Handler

```typescript
export class ApiInterceptor implements HttpInterceptor {
  private toaster = inject(ToasterService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toaster.error('Unauthorized', 'Please log in again');
        } else if (error.status === 500) {
          this.toaster.error('Server Error', 'Something went wrong');
        } else if (error.status === 0) {
          this.toaster.error('Network Error', 'Check your connection');
        }
        
        return throwError(() => error);
      })
    );
  }
}
```

### Multi-step Process

```typescript
export class WizardComponent {
  private toaster = inject(ToasterService);

  async completeWizard(steps: Step[]) {
    const toastId = this.toaster.loading('Step 1/3', 'Processing...');

    try {
      // Step 1
      await this.processStep(steps[0]);
      this.toaster.update(toastId, {
        description: 'Step 1 complete. Processing step 2...'
      });

      // Step 2
      await this.processStep(steps[1]);
      this.toaster.update(toastId, {
        description: 'Step 2 complete. Processing step 3...'
      });

      // Step 3
      await this.processStep(steps[2]);
      this.toaster.update(toastId, {
        type: 'success',
        title: 'Complete!',
        description: 'All steps completed successfully',
        duration: 4000
      });
    } catch (error) {
      this.toaster.update(toastId, {
        type: 'error',
        title: 'Failed',
        description: error.message,
        duration: 5000
      });
    }
  }
}
```

## Service API Reference

### Methods

```typescript
// Basic toasts
toaster.success(title: string, description?: string, options?: Partial<Toast>): string
toaster.error(title: string, description?: string, options?: Partial<Toast>): string
toaster.warning(title: string, description?: string, options?: Partial<Toast>): string
toaster.info(title: string, description?: string, options?: Partial<Toast>): string
toaster.loading(title: string, description?: string, options?: Partial<Toast>): string
toaster.default(title: string, description?: string, options?: Partial<Toast>): string

// Control
toaster.dismiss(id: string): void
toaster.dismissAll(): void
toaster.update(id: string, updates: Partial<Toast>): void

// Promise helper
toaster.promise<T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  }
): Promise<T>
```

### Toast Options

```typescript
interface Toast {
  type: 'success' | 'error' | 'info' | 'warning' | 'loading' | 'default';
  title?: string;
  description?: string;
  duration?: number; // milliseconds, 0 = no auto-dismiss
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
}
```

## Styling

### Custom Colors

```css
/* Override in your global styles */
.toast[data-type="success"] {
  background-color: #your-color;
  border-color: #your-border;
}
```

### Position All Toasts

```html
<!-- Top center for all toasts -->
<app-toaster [position]="'top-center'"></app-toaster>
```

## Accessibility

- Uses ARIA attributes for screen readers
- Keyboard accessible (Tab to focus, Enter/Space to activate)
- Close button labeled for assistive technology
- Respects `prefers-reduced-motion`

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Notes

- Maximum 5 toasts displayed at once (oldest dismissed first)
- Error toasts last 6 seconds by default (longer than success)
- Loading toasts don't auto-dismiss
- Toasts are positioned fixed and won't interfere with page layout
- Dark mode automatically detected via `prefers-color-scheme`

## License

MIT
