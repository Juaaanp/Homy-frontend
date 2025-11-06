# Tabs Components

A set of tab components for creating accessible tabbed interfaces in Angular. This is a complete Angular adaptation of the React Shadcn/UI Tabs components.

## Features

- 🎯 **Accessible**: ARIA attributes, keyboard navigation
- 🎨 **Styled**: Pre-styled with smooth transitions
- ⌨️ **Keyboard Support**: Arrow keys navigation
- 🎭 **Active States**: Visual feedback for active tab
- 📦 **Composable**: Build custom tab layouts
- 🔄 **Controlled/Uncontrolled**: Support both modes
- 📱 **Responsive**: Works on all screen sizes
- ♿ **Screen Reader Friendly**: Proper roles and labels

## Installation

The components are already included in your project under `src/app/components/tabs/`.

```typescript
import {
  TabsComponent,
  TabsListComponent,
  TabsTriggerComponent,
  TabsContentComponent
} from '@/app/components/tabs';
```

## Basic Usage

```html
<app-tabs [defaultValue]="'account'">
  <app-tabs-list>
    <app-tabs-trigger [value]="'account'">Account</app-tabs-trigger>
    <app-tabs-trigger [value]="'password'">Password</app-tabs-trigger>
    <app-tabs-trigger [value]="'settings'">Settings</app-tabs-trigger>
  </app-tabs-list>

  <app-tabs-content [value]="'account'">
    <h3>Account Settings</h3>
    <p>Manage your account settings here.</p>
  </app-tabs-content>

  <app-tabs-content [value]="'password'">
    <h3>Change Password</h3>
    <p>Update your password here.</p>
  </app-tabs-content>

  <app-tabs-content [value]="'settings'">
    <h3>Application Settings</h3>
    <p>Configure your application preferences.</p>
  </app-tabs-content>
</app-tabs>
```

## Components

### Tabs (Container)

The root tabs component.

```html
<app-tabs
  [defaultValue]="'tab1'"
  [value]="activeTab"
  (valueChange)="onTabChange($event)">
  <!-- tabs content -->
</app-tabs>
```

**Props:**
- `defaultValue?: string` - Initial active tab (uncontrolled)
- `value?: string` - Active tab (controlled)
- `valueChange?: EventEmitter<string>` - Emits when tab changes
- `className?: string` - Additional CSS classes

### TabsList

Container for tab triggers.

```html
<app-tabs-list [className]="'custom-class'">
  <app-tabs-trigger [value]="'tab1'">Tab 1</app-tabs-trigger>
  <app-tabs-trigger [value]="'tab2'">Tab 2</app-tabs-trigger>
</app-tabs-list>
```

**Props:**
- `className?: string` - Additional CSS classes

### TabsTrigger

Individual tab button.

```html
<app-tabs-trigger
  [value]="'profile'"
  [disabled]="false"
  [className]="'custom-class'">
  Profile
</app-tabs-trigger>
```

**Props:**
- `value: string` - Tab identifier (required)
- `disabled?: boolean` - Disabled state
- `className?: string` - Additional CSS classes

### TabsContent

Content panel for a tab.

```html
<app-tabs-content [value]="'profile'">
  <p>Profile content goes here</p>
</app-tabs-content>
```

**Props:**
- `value: string` - Tab identifier (required)
- `className?: string` - Additional CSS classes

## Examples

### Controlled Tabs

```html
<app-tabs [(value)]="currentTab" (valueChange)="onTabChange($event)">
  <app-tabs-list>
    <app-tabs-trigger [value]="'overview'">Overview</app-tabs-trigger>
    <app-tabs-trigger [value]="'analytics'">Analytics</app-tabs-trigger>
    <app-tabs-trigger [value]="'reports'">Reports</app-tabs-trigger>
  </app-tabs-list>

  <app-tabs-content [value]="'overview'">
    <div class="p-3">Overview content</div>
  </app-tabs-content>

  <app-tabs-content [value]="'analytics'">
    <div class="p-3">Analytics content</div>
  </app-tabs-content>

  <app-tabs-content [value]="'reports'">
    <div class="p-3">Reports content</div>
  </app-tabs-content>
</app-tabs>
```

```typescript
export class DashboardComponent {
  currentTab = 'overview';

  onTabChange(value: string): void {
    console.log('Tab changed to:', value);
    this.currentTab = value;
    
    // Save to localStorage
    localStorage.setItem('activeTab', value);
  }
}
```

### With Icons

```html
<app-tabs [defaultValue]="'home'">
  <app-tabs-list>
    <app-tabs-trigger [value]="'home'">
      <svg width="16" height="16" class="me-1"><!-- Home icon --></svg>
      Home
    </app-tabs-trigger>
    <app-tabs-trigger [value]="'profile'">
      <svg width="16" height="16" class="me-1"><!-- User icon --></svg>
      Profile
    </app-tabs-trigger>
    <app-tabs-trigger [value]="'settings'">
      <svg width="16" height="16" class="me-1"><!-- Settings icon --></svg>
      Settings
    </app-tabs-trigger>
  </app-tabs-list>

  <app-tabs-content [value]="'home'">
    <div class="card p-3">Home content</div>
  </app-tabs-content>

  <app-tabs-content [value]="'profile'">
    <div class="card p-3">Profile content</div>
  </app-tabs-content>

  <app-tabs-content [value]="'settings'">
    <div class="card p-3">Settings content</div>
  </app-tabs-content>
</app-tabs>
```

### Settings Panel

```html
<div class="card p-4">
  <h2 class="mb-3">Account Settings</h2>
  
  <app-tabs [defaultValue]="'general'">
    <app-tabs-list>
      <app-tabs-trigger [value]="'general'">General</app-tabs-trigger>
      <app-tabs-trigger [value]="'security'">Security</app-tabs-trigger>
      <app-tabs-trigger [value]="'notifications'">Notifications</app-tabs-trigger>
      <app-tabs-trigger [value]="'billing'">Billing</app-tabs-trigger>
    </app-tabs-list>

    <app-tabs-content [value]="'general'">
      <div class="mt-3">
        <h5>General Settings</h5>
        <form>
          <div class="mb-3">
            <label class="form-label">Display Name</label>
            <input type="text" class="form-control" placeholder="Your name">
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" placeholder="your@email.com">
          </div>
          <button class="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </app-tabs-content>

    <app-tabs-content [value]="'security'">
      <div class="mt-3">
        <h5>Security Settings</h5>
        <form>
          <div class="mb-3">
            <label class="form-label">Current Password</label>
            <input type="password" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">New Password</label>
            <input type="password" class="form-control">
          </div>
          <button class="btn btn-primary">Update Password</button>
        </form>
      </div>
    </app-tabs-content>

    <app-tabs-content [value]="'notifications'">
      <div class="mt-3">
        <h5>Notification Preferences</h5>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <div class="fw-medium">Email Notifications</div>
            <small class="text-muted">Receive updates via email</small>
          </div>
          <app-switch [(ngModel)]="emailNotifications"></app-switch>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <div class="fw-medium">Push Notifications</div>
            <small class="text-muted">Receive push notifications</small>
          </div>
          <app-switch [(ngModel)]="pushNotifications"></app-switch>
        </div>
      </div>
    </app-tabs-content>

    <app-tabs-content [value]="'billing'">
      <div class="mt-3">
        <h5>Billing Information</h5>
        <p class="text-muted">Manage your billing and payment methods.</p>
        <button class="btn btn-outline-primary">Update Billing Info</button>
      </div>
    </app-tabs-content>
  </app-tabs>
</div>
```

### Product Details

```html
<div class="card p-4">
  <div class="row">
    <div class="col-md-6">
      <img [src]="product.image" class="img-fluid rounded">
    </div>
    <div class="col-md-6">
      <h2>{{ product.name }}</h2>
      <p class="h4 text-primary mb-3">{{ product.price | currency }}</p>
      
      <app-tabs [defaultValue]="'description'">
        <app-tabs-list>
          <app-tabs-trigger [value]="'description'">Description</app-tabs-trigger>
          <app-tabs-trigger [value]="'specs'">Specifications</app-tabs-trigger>
          <app-tabs-trigger [value]="'reviews'">Reviews ({{ reviewCount }})</app-tabs-trigger>
        </app-tabs-list>

        <app-tabs-content [value]="'description'">
          <div class="mt-3">
            <p>{{ product.description }}</p>
          </div>
        </app-tabs-content>

        <app-tabs-content [value]="'specs'">
          <div class="mt-3">
            <table class="table">
              <tbody>
                <tr *ngFor="let spec of product.specifications">
                  <th class="w-50">{{ spec.name }}</th>
                  <td>{{ spec.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </app-tabs-content>

        <app-tabs-content [value]="'reviews'">
          <div class="mt-3">
            <div *ngFor="let review of product.reviews" class="mb-3">
              <div class="d-flex justify-content-between">
                <strong>{{ review.author }}</strong>
                <span class="text-warning">★ {{ review.rating }}/5</span>
              </div>
              <p class="text-muted small">{{ review.comment }}</p>
            </div>
          </div>
        </app-tabs-content>
      </app-tabs>

      <button class="btn btn-primary btn-lg w-100 mt-3">Add to Cart</button>
    </div>
  </div>
</div>
```

### Dashboard with Stats

```html
<div class="container-fluid">
  <h1 class="mb-4">Dashboard</h1>
  
  <app-tabs [(value)]="activeView" (valueChange)="loadData($event)">
    <app-tabs-list>
      <app-tabs-trigger [value]="'overview'">Overview</app-tabs-trigger>
      <app-tabs-trigger [value]="'analytics'">Analytics</app-tabs-trigger>
      <app-tabs-trigger [value]="'reports'">Reports</app-tabs-trigger>
      <app-tabs-trigger [value]="'notifications'">
        Notifications
        <span class="badge bg-danger ms-1" *ngIf="notificationCount > 0">
          {{ notificationCount }}
        </span>
      </app-tabs-trigger>
    </app-tabs-list>

    <app-tabs-content [value]="'overview'">
      <div class="row g-3 mt-2">
        <div class="col-md-3" *ngFor="let stat of stats">
          <div class="card p-3">
            <small class="text-muted">{{ stat.label }}</small>
            <h3 class="mb-0">{{ stat.value }}</h3>
            <small [class]="stat.change > 0 ? 'text-success' : 'text-danger'">
              {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}%
            </small>
          </div>
        </div>
      </div>
    </app-tabs-content>

    <app-tabs-content [value]="'analytics'">
      <div class="card p-4 mt-2">
        <h4>Analytics Dashboard</h4>
        <!-- Chart component -->
      </div>
    </app-tabs-content>

    <app-tabs-content [value]="'reports'">
      <div class="card p-4 mt-2">
        <h4>Reports</h4>
        <!-- Reports table -->
      </div>
    </app-tabs-content>

    <app-tabs-content [value]="'notifications'">
      <div class="card p-4 mt-2">
        <h4>Notifications</h4>
        <div *ngFor="let notification of notifications" class="mb-2">
          {{ notification.message }}
        </div>
      </div>
    </app-tabs-content>
  </app-tabs>
</div>
```

```typescript
export class DashboardComponent {
  activeView = 'overview';
  notificationCount = 3;
  
  stats = [
    { label: 'Revenue', value: '$12,345', change: 12.5 },
    { label: 'Users', value: '1,234', change: -2.3 },
    { label: 'Orders', value: '567', change: 8.1 },
    { label: 'Products', value: '89', change: 0 }
  ];

  loadData(tab: string): void {
    console.log('Loading data for:', tab);
    // Fetch data for the selected tab
  }
}
```

### Disabled Tab

```html
<app-tabs [defaultValue]="'tab1'">
  <app-tabs-list>
    <app-tabs-trigger [value]="'tab1'">Available</app-tabs-trigger>
    <app-tabs-trigger [value]="'tab2'" [disabled]="true">
      Coming Soon
    </app-tabs-trigger>
    <app-tabs-trigger [value]="'tab3'" [disabled]="!isPremium">
      Premium Only
    </app-tabs-trigger>
  </app-tabs-list>

  <app-tabs-content [value]="'tab1'">
    <p>This content is available to all users.</p>
  </app-tabs-content>

  <app-tabs-content [value]="'tab3'">
    <p>This content is only available to premium users.</p>
  </app-tabs-content>
</app-tabs>
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| **Tab** | Move focus to next trigger |
| **Shift+Tab** | Move focus to previous trigger |
| **Enter/Space** | Activate focused trigger |
| **Arrow Left** | Focus previous trigger |
| **Arrow Right** | Focus next trigger |

## Accessibility

### ARIA Attributes

- `role="tablist"` on tabs list
- `role="tab"` on tab triggers
- `role="tabpanel"` on tab content
- `aria-selected` on active trigger
- Proper keyboard navigation

### Screen Reader Support

```html
<!-- Add descriptive labels -->
<app-tabs [attr.aria-label]="'User settings navigation'">
  <app-tabs-list>
    <app-tabs-trigger [value]="'profile'">
      Profile Settings
    </app-tabs-trigger>
  </app-tabs-list>
</app-tabs>
```

## Styling

### Custom Tab List

```css
/* In your component styles */
::ng-deep .tabs-list {
  background-color: #f0f0f0;
  border-radius: 0.5rem;
}

::ng-deep .tabs-trigger[data-state="active"] {
  background-color: var(--bs-primary);
  color: white;
}
```

### Full-width Tabs

```html
<app-tabs-list [className]="'w-100 d-flex'">
  <app-tabs-trigger [value]="'tab1'" [className]="'flex-fill'">
    Tab 1
  </app-tabs-trigger>
  <app-tabs-trigger [value]="'tab2'" [className]="'flex-fill'">
    Tab 2
  </app-tabs-trigger>
</app-tabs-list>
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Notes

- Tab content is only rendered when active (using `*ngIf`)
- Supports both controlled and uncontrolled modes
- Active state is automatically managed
- Works great with forms and complex content
- Respects `prefers-reduced-motion`

## License

MIT
