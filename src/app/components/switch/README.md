# Switch Component

A toggle switch component for Angular. This is a complete Angular adaptation of the React Shadcn/UI Switch component with native implementation (no Radix UI dependency).

## Features

- 🎯 **Toggle Control**: On/off switch for boolean values
- 📦 **Forms Integration**: Implements ControlValueAccessor
- ⌨️ **Keyboard Support**: Space and Enter keys
- ♿ **Accessible**: ARIA attributes, role="switch"
- 🎨 **Customizable**: Size variants and custom styles
- 🌙 **Dark Mode**: Automatic dark mode support
- 🎭 **States**: Checked, unchecked, disabled, focus
- 📱 **Touch Friendly**: Works on mobile devices

## Installation

The component is already included in your project under `src/app/components/switch/`.

```typescript
import { SwitchComponent } from '@/app/components/switch';
```

## Basic Usage

### Template-Driven Forms

```html
<app-switch [(ngModel)]="isEnabled"></app-switch>

<p>Status: {{ isEnabled ? 'On' : 'Off' }}</p>
```

```typescript
export class MyComponent {
  isEnabled = false;
}
```

### Reactive Forms

```html
<form [formGroup]="form">
  <app-switch formControlName="notifications"></app-switch>
</form>
```

```typescript
export class MyComponent {
  form = this.fb.group({
    notifications: [true]
  });

  constructor(private fb: FormBuilder) {}
}
```

### Standalone (Event Binding)

```html
<app-switch 
  [checked]="isEnabled"
  (checkedChange)="onToggle($event)">
</app-switch>
```

```typescript
export class MyComponent {
  isEnabled = false;

  onToggle(checked: boolean): void {
    console.log('Switch toggled:', checked);
    this.isEnabled = checked;
  }
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | `''` | Input ID |
| `name` | `string` | `''` | Input name |
| `required` | `boolean` | `false` | Required field |
| `ngModel` | `boolean` | - | Value (template-driven) |
| `formControlName` | `string` | - | Form control name (reactive) |

## Events

| Event | Type | Description |
|-------|------|-------------|
| `checkedChange` | `EventEmitter<boolean>` | Emits when switch is toggled |
| `ngModelChange` | `EventEmitter<boolean>` | ngModel two-way binding |

## Examples

### With Label

```html
<div class="d-flex align-items-center gap-2">
  <app-switch 
    [(ngModel)]="darkMode"
    id="dark-mode">
  </app-switch>
  <label for="dark-mode" class="mb-0 cursor-pointer">
    Dark Mode
  </label>
</div>
```

### Settings Form

```html
<div class="card p-3">
  <h5 class="mb-3">Notification Settings</h5>
  
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <div class="fw-medium">Email Notifications</div>
      <small class="text-muted">Receive updates via email</small>
    </div>
    <app-switch [(ngModel)]="settings.emailNotifications"></app-switch>
  </div>

  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <div class="fw-medium">Push Notifications</div>
      <small class="text-muted">Receive push notifications</small>
    </div>
    <app-switch [(ngModel)]="settings.pushNotifications"></app-switch>
  </div>

  <div class="d-flex justify-content-between align-items-center">
    <div>
      <div class="fw-medium">Marketing Emails</div>
      <small class="text-muted">Receive promotional content</small>
    </div>
    <app-switch [(ngModel)]="settings.marketingEmails"></app-switch>
  </div>
</div>
```

```typescript
export class SettingsComponent {
  settings = {
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false
  };
}
```

### Disabled State

```html
<app-switch 
  [(ngModel)]="value"
  [disabled]="true">
</app-switch>

<app-switch 
  [(ngModel)]="value"
  [disabled]="!isPremiumUser">
</app-switch>
```

### With Reactive Forms

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div class="mb-3">
    <div class="d-flex justify-content-between align-items-center">
      <label class="form-label mb-0">Accept Terms</label>
      <app-switch formControlName="acceptTerms"></app-switch>
    </div>
    <div 
      *ngIf="form.get('acceptTerms')?.invalid && form.get('acceptTerms')?.touched"
      class="text-danger mt-1 small">
      You must accept the terms
    </div>
  </div>

  <button 
    type="submit" 
    class="btn btn-primary"
    [disabled]="form.invalid">
    Submit
  </button>
</form>
```

```typescript
export class FormComponent {
  form = this.fb.group({
    acceptTerms: [false, Validators.requiredTrue]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}
```

### Size Variants

```html
<!-- Small -->
<app-switch 
  [(ngModel)]="value"
  [className]="'switch-sm'">
</app-switch>

<!-- Default -->
<app-switch [(ngModel)]="value"></app-switch>

<!-- Large -->
<app-switch 
  [(ngModel)]="value"
  [className]="'switch-lg'">
</app-switch>
```

### Privacy Settings

```html
<div class="card p-3">
  <h5 class="mb-3">Privacy Settings</h5>
  
  <form [formGroup]="privacyForm">
    <div class="mb-3">
      <div class="d-flex justify-content-between align-items-start">
        <div class="flex-grow-1">
          <label class="fw-medium d-block mb-1">Profile Visibility</label>
          <small class="text-muted">
            Make your profile visible to other users
          </small>
        </div>
        <app-switch formControlName="profileVisible"></app-switch>
      </div>
    </div>

    <div class="mb-3">
      <div class="d-flex justify-content-between align-items-start">
        <div class="flex-grow-1">
          <label class="fw-medium d-block mb-1">Show Activity Status</label>
          <small class="text-muted">
            Let others see when you're active
          </small>
        </div>
        <app-switch 
          formControlName="showActivityStatus"
          [disabled]="!privacyForm.get('profileVisible')?.value">
        </app-switch>
      </div>
    </div>

    <div>
      <div class="d-flex justify-content-between align-items-start">
        <div class="flex-grow-1">
          <label class="fw-medium d-block mb-1">Allow Messages</label>
          <small class="text-muted">
            Receive messages from other users
          </small>
        </div>
        <app-switch formControlName="allowMessages"></app-switch>
      </div>
    </div>
  </form>
</div>
```

```typescript
export class PrivacyComponent {
  privacyForm = this.fb.group({
    profileVisible: [true],
    showActivityStatus: [false],
    allowMessages: [true]
  });

  constructor(private fb: FormBuilder) {
    // Disable activity status when profile is hidden
    this.privacyForm.get('profileVisible')?.valueChanges.subscribe(visible => {
      if (!visible) {
        this.privacyForm.patchValue({ showActivityStatus: false });
      }
    });
  }
}
```

### Feature Toggles

```html
<div class="card p-3">
  <h5 class="mb-3">Feature Flags</h5>
  
  <div *ngFor="let feature of features" class="mb-3">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <div class="fw-medium">{{ feature.name }}</div>
        <small class="text-muted">{{ feature.description }}</small>
      </div>
      <app-switch 
        [(ngModel)]="feature.enabled"
        (checkedChange)="onFeatureToggle(feature, $event)">
      </app-switch>
    </div>
  </div>
</div>
```

```typescript
export class FeaturesComponent {
  features = [
    {
      id: 'experimental-ui',
      name: 'Experimental UI',
      description: 'Try out new interface features',
      enabled: false
    },
    {
      id: 'beta-features',
      name: 'Beta Features',
      description: 'Access to beta functionality',
      enabled: true
    },
    {
      id: 'developer-mode',
      name: 'Developer Mode',
      description: 'Enable advanced developer tools',
      enabled: false
    }
  ];

  onFeatureToggle(feature: any, enabled: boolean): void {
    console.log(`Feature ${feature.name} is now ${enabled ? 'enabled' : 'disabled'}`);
    // Save to backend
    this.featureService.updateFeature(feature.id, enabled);
  }
}
```

### Auto-save Settings

```html
<div class="card p-3">
  <h5 class="mb-3">Auto-save Settings</h5>
  
  <div class="d-flex justify-content-between align-items-center">
    <div>
      <div class="fw-medium">Auto-save</div>
      <small class="text-muted">
        {{ autoSaveEnabled ? 'Saving changes automatically' : 'Manual save required' }}
      </small>
    </div>
    <app-switch 
      [(ngModel)]="autoSaveEnabled"
      (checkedChange)="onAutoSaveToggle($event)">
    </app-switch>
  </div>
  
  <div *ngIf="lastSaved" class="mt-2 text-muted small">
    Last saved: {{ lastSaved | date:'short' }}
  </div>
</div>
```

```typescript
export class EditorComponent {
  autoSaveEnabled = true;
  lastSaved: Date | null = null;
  private autoSaveInterval?: any;

  ngOnInit(): void {
    if (this.autoSaveEnabled) {
      this.startAutoSave();
    }
  }

  onAutoSaveToggle(enabled: boolean): void {
    if (enabled) {
      this.startAutoSave();
    } else {
      this.stopAutoSave();
    }
  }

  private startAutoSave(): void {
    this.autoSaveInterval = setInterval(() => {
      this.save();
    }, 30000); // Every 30 seconds
  }

  private stopAutoSave(): void {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
  }

  private save(): void {
    // Save logic
    this.lastSaved = new Date();
  }

  ngOnDestroy(): void {
    this.stopAutoSave();
  }
}
```

### Theme Switcher

```html
<div class="d-flex align-items-center gap-3">
  <svg width="16" height="16"><!-- Sun icon --></svg>
  <app-switch 
    [(ngModel)]="isDarkMode"
    (checkedChange)="toggleTheme($event)">
  </app-switch>
  <svg width="16" height="16"><!-- Moon icon --></svg>
</div>
```

```typescript
export class ThemeSwitcherComponent {
  isDarkMode = false;

  ngOnInit(): void {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme(this.isDarkMode);
  }

  toggleTheme(isDark: boolean): void {
    this.applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean): void {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }
}
```

## Keyboard Support

| Key | Action |
|-----|--------|
| **Space** | Toggle switch |
| **Enter** | Toggle switch |
| **Tab** | Focus next/previous element |

## Accessibility

### ARIA Attributes

The component automatically includes:
- `role="switch"`
- `aria-checked` (true/false)
- `aria-disabled` (when disabled)
- `aria-required` (when required)

### Screen Reader Support

```html
<!-- With label -->
<label for="notifications" class="visually-hidden">
  Enable notifications
</label>
<app-switch 
  id="notifications"
  [(ngModel)]="notificationsEnabled">
</app-switch>

<!-- With aria-label -->
<app-switch 
  [(ngModel)]="value"
  [attr.aria-label]="'Toggle dark mode'">
</app-switch>

<!-- With aria-labelledby -->
<span id="theme-label">Dark Mode</span>
<app-switch 
  [(ngModel)]="darkMode"
  [attr.aria-labelledby]="'theme-label'">
</app-switch>
```

## Custom Styling

### Custom Colors

```css
/* In your component or global styles */
.switch-root[data-state="checked"] {
  background-color: #10b981; /* Green */
}

.switch-success[data-state="checked"] {
  background-color: var(--bs-success);
}

.switch-danger[data-state="checked"] {
  background-color: var(--bs-danger);
}
```

```html
<app-switch 
  [(ngModel)]="value"
  [className]="'switch-success'">
</app-switch>
```

### Custom Sizes

The component includes built-in size variants:

```html
<!-- Small (0.875rem × 1.5rem) -->
<app-switch [className]="'switch-sm'"></app-switch>

<!-- Default (1.15rem × 2rem) -->
<app-switch></app-switch>

<!-- Large (1.5rem × 2.75rem) -->
<app-switch [className]="'switch-lg'"></app-switch>
```

## Form Validation

```html
<form [formGroup]="form">
  <div class="mb-3">
    <label class="form-label">Terms and Conditions</label>
    <div class="d-flex align-items-center gap-2">
      <app-switch 
        formControlName="acceptTerms"
        [required]="true">
      </app-switch>
      <small>I accept the terms and conditions</small>
    </div>
    <div 
      *ngIf="form.get('acceptTerms')?.invalid && form.get('acceptTerms')?.touched"
      class="text-danger small mt-1">
      You must accept the terms to continue
    </div>
  </div>
</form>
```

```typescript
export class Component {
  form = this.fb.group({
    acceptTerms: [false, Validators.requiredTrue]
  });
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Notes

- The switch uses a `<button>` element for better accessibility
- Clicking anywhere on the switch toggles it
- Respects `prefers-reduced-motion` for animations
- Dark mode automatically detected via `prefers-color-scheme`
- Works with both template-driven and reactive forms
- The thumb smoothly slides between positions

## Differences from React Version

- **No Radix UI dependency**: Native button implementation
- **ControlValueAccessor**: Full Angular forms integration
- **EventEmitters**: Angular-style event handling
- **Two-way binding**: ngModel support

Despite these differences, the API and behavior match the React version closely.

## License

MIT
