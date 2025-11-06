# Sidebar Component

A composable, accessible sidebar component for Angular applications. Built as a complete Angular adaptation of the React Shadcn/UI Sidebar component.

## Features

- 🎨 **Multiple Variants**: `sidebar` (default), `floating`, and `inset` layouts
- 📱 **Responsive**: Automatic mobile detection with Sheet-based drawer on small screens
- 🎯 **Collapsible Modes**: `offcanvas`, `icon`, and `none` collapse behaviors
- ⌨️ **Keyboard Shortcuts**: Toggle with `Ctrl+B` (Windows/Linux) or `Cmd+B` (Mac)
- 🧩 **Composable**: 20+ sub-components for building complex navigation structures
- ♿ **Accessible**: ARIA attributes, keyboard navigation, and screen reader support
- 🎭 **Flexible State**: Cookie-based state persistence support
- 📦 **Standalone**: No external dependencies beyond Angular and the Sheet component

## Installation

The component is already included in your project under `src/app/components/sidebar/`.

```typescript
import {
  SidebarProviderComponent,
  SidebarComponent,
  SidebarHeaderComponent,
  SidebarContentComponent,
  SidebarGroupComponent,
  SidebarMenuComponent,
  SidebarMenuItemComponent,
  SidebarMenuButtonComponent,
  SidebarFooterComponent
} from '@/app/components/sidebar';
```

## Basic Usage

```html
<!-- In your page template -->
<app-sidebar-provider [defaultOpen]="true">
  <app-sidebar>
    <app-sidebar-header>
      <h2>My App</h2>
    </app-sidebar-header>
    
    <app-sidebar-content>
      <app-sidebar-group>
        <app-sidebar-menu>
          <app-sidebar-menu-item>
            <app-sidebar-menu-button [isActive]="true">
              <svg><!-- Home icon --></svg>
              <span>Home</span>
            </app-sidebar-menu-button>
          </app-sidebar-menu-item>
          
          <app-sidebar-menu-item>
            <app-sidebar-menu-button>
              <svg><!-- Settings icon --></svg>
              <span>Settings</span>
            </app-sidebar-menu-button>
          </app-sidebar-menu-item>
        </app-sidebar-menu>
      </app-sidebar-group>
    </app-sidebar-content>
    
    <app-sidebar-footer>
      <p>v1.0.0</p>
    </app-sidebar-footer>
  </app-sidebar>
  
  <!-- Your main content -->
  <app-sidebar-inset>
    <main>
      <ng-content></ng-content>
    </main>
  </app-sidebar-inset>
</app-sidebar-provider>
```

## Component Structure

### Core Components

#### SidebarProvider
The root provider component that manages sidebar state.

```html
<app-sidebar-provider 
  [defaultOpen]="true"
  [open]="isOpen"
  (openChange)="onOpenChange($event)">
  <!-- Sidebar and content -->
</app-sidebar-provider>
```

**Props:**
- `defaultOpen?: boolean` - Initial open state (default: `true`)
- `open?: boolean` - Controlled open state
- `openChange?: EventEmitter<boolean>` - Fires when open state changes

#### Sidebar
The main sidebar container.

```html
<app-sidebar 
  [side]="'left'"
  [variant]="'sidebar'"
  [collapsible]="'offcanvas'">
  <!-- Sidebar content -->
</app-sidebar>
```

**Props:**
- `side?: 'left' | 'right'` - Sidebar position (default: `'left'`)
- `variant?: 'sidebar' | 'floating' | 'inset'` - Visual variant (default: `'sidebar'`)
- `collapsible?: 'offcanvas' | 'icon' | 'none'` - Collapse behavior (default: `'offcanvas'`)

**Variants:**
- `sidebar`: Standard fixed sidebar
- `floating`: Floating panel with shadow
- `inset`: Inset panel with padding

**Collapsible Modes:**
- `offcanvas`: Slides completely off-screen
- `icon`: Collapses to icon-only mode
- `none`: Cannot be collapsed

#### SidebarTrigger
A directive to toggle the sidebar.

```html
<button appSidebarTrigger>Toggle Sidebar</button>
```

### Layout Components

#### SidebarHeader
Header section of the sidebar.

```html
<app-sidebar-header>
  <h2>My Application</h2>
  <button appSidebarTrigger>✕</button>
</app-sidebar-header>
```

#### SidebarContent
Scrollable content area.

```html
<app-sidebar-content>
  <!-- Navigation menus and groups -->
</app-sidebar-content>
```

#### SidebarFooter
Footer section of the sidebar.

```html
<app-sidebar-footer>
  <p>© 2024 My App</p>
</app-sidebar-footer>
```

### Navigation Components

#### SidebarGroup
Groups related menu items together.

```html
<app-sidebar-group>
  <app-sidebar-group-label>Navigation</app-sidebar-group-label>
  <app-sidebar-group-content>
    <app-sidebar-menu>
      <!-- Menu items -->
    </app-sidebar-menu>
  </app-sidebar-group-content>
</app-sidebar-group>
```

#### SidebarMenu
Container for menu items.

```html
<app-sidebar-menu>
  <app-sidebar-menu-item>
    <!-- Menu button -->
  </app-sidebar-menu-item>
</app-sidebar-menu>
```

#### SidebarMenuItem
Individual menu item container.

```html
<app-sidebar-menu-item>
  <app-sidebar-menu-button [isActive]="true">
    <svg><!-- Icon --></svg>
    <span>Dashboard</span>
  </app-sidebar-menu-button>
  <app-sidebar-menu-action>
    <button>⋮</button>
  </app-sidebar-menu-action>
  <app-sidebar-menu-badge>3</app-sidebar-menu-badge>
</app-sidebar-menu-item>
```

#### SidebarMenuButton
Clickable menu button with variants.

```html
<app-sidebar-menu-button
  [variant]="'default'"
  [size]="'default'"
  [isActive]="false">
  <svg><!-- Icon --></svg>
  <span>Menu Item</span>
</app-sidebar-menu-button>
```

**Props:**
- `variant?: 'default' | 'outline'` - Visual style (default: `'default'`)
- `size?: 'default' | 'sm' | 'lg'` - Button size (default: `'default'`)
- `isActive?: boolean` - Active state (default: `false`)

#### SidebarMenuAction
Action button that appears on hover.

```html
<app-sidebar-menu-action [showOnHover]="true">
  <button>⋮</button>
</app-sidebar-menu-action>
```

#### SidebarMenuBadge
Badge for counts or notifications.

```html
<app-sidebar-menu-badge>5</app-sidebar-menu-badge>
```

#### SidebarMenuSkeleton
Loading skeleton for menu items.

```html
<app-sidebar-menu-skeleton [showSubtitle]="true"></app-sidebar-menu-skeleton>
```

### Submenu Components

#### SidebarMenuSub
Container for nested menu items.

```html
<app-sidebar-menu-sub>
  <app-sidebar-menu-sub-item>
    <app-sidebar-menu-sub-button [isActive]="false">
      Submenu Item
    </app-sidebar-menu-sub-button>
  </app-sidebar-menu-sub-item>
</app-sidebar-menu-sub>
```

### Utility Components

#### SidebarInset
Main content area that adjusts to sidebar state.

```html
<app-sidebar-inset>
  <main>
    <!-- Your page content -->
  </main>
</app-sidebar-inset>
```

#### SidebarRail
Visual resize handle (decorative).

```html
<app-sidebar-rail></app-sidebar-rail>
```

#### SidebarSeparator
Visual separator line.

```html
<app-sidebar-separator></app-sidebar-separator>
```

#### SidebarInput
Search/filter input for sidebar.

```html
<app-sidebar-input 
  [placeholder]="'Search...'"
  [(ngModel)]="searchQuery">
</app-sidebar-input>
```

## Complete Example

```html
<app-sidebar-provider>
  <app-sidebar [side]="'left'" [variant]="'sidebar'" [collapsible]="'offcanvas'">
    <app-sidebar-header>
      <h2 class="text-lg font-semibold">My App</h2>
      <button appSidebarTrigger class="ml-auto">✕</button>
    </app-sidebar-header>

    <app-sidebar-content>
      <app-sidebar-input [placeholder]="'Search...'"></app-sidebar-input>
      
      <app-sidebar-group>
        <app-sidebar-group-label>Main Menu</app-sidebar-group-label>
        <app-sidebar-group-content>
          <app-sidebar-menu>
            <app-sidebar-menu-item>
              <app-sidebar-menu-button [isActive]="true">
                <svg><!-- Home icon --></svg>
                <span>Home</span>
              </app-sidebar-menu-button>
            </app-sidebar-menu-item>

            <app-sidebar-menu-item>
              <app-sidebar-menu-button>
                <svg><!-- Inbox icon --></svg>
                <span>Inbox</span>
              </app-sidebar-menu-button>
              <app-sidebar-menu-badge>12</app-sidebar-menu-badge>
            </app-sidebar-menu-item>

            <app-sidebar-menu-item>
              <app-sidebar-menu-button>
                <svg><!-- Projects icon --></svg>
                <span>Projects</span>
              </app-sidebar-menu-button>
              <app-sidebar-menu-sub>
                <app-sidebar-menu-sub-item>
                  <app-sidebar-menu-sub-button>Project A</app-sidebar-menu-sub-button>
                </app-sidebar-menu-sub-item>
                <app-sidebar-menu-sub-item>
                  <app-sidebar-menu-sub-button>Project B</app-sidebar-menu-sub-button>
                </app-sidebar-menu-sub-item>
              </app-sidebar-menu-sub>
            </app-sidebar-menu-item>
          </app-sidebar-menu>
        </app-sidebar-group-content>
      </app-sidebar-group>

      <app-sidebar-separator></app-sidebar-separator>

      <app-sidebar-group>
        <app-sidebar-group-label>Settings</app-sidebar-group-label>
        <app-sidebar-menu>
          <app-sidebar-menu-item>
            <app-sidebar-menu-button>
              <svg><!-- Settings icon --></svg>
              <span>Preferences</span>
            </app-sidebar-menu-button>
          </app-sidebar-menu-item>
        </app-sidebar-menu>
      </app-sidebar-group>
    </app-sidebar-content>

    <app-sidebar-footer>
      <div class="flex items-center gap-2">
        <div class="avatar">U</div>
        <div class="flex-1">
          <p class="text-sm font-medium">User Name</p>
          <p class="text-xs text-muted">user@email.com</p>
        </div>
      </div>
    </app-sidebar-footer>

    <app-sidebar-rail></app-sidebar-rail>
  </app-sidebar>

  <app-sidebar-inset>
    <header class="sticky top-0 flex h-16 items-center gap-2 bg-background px-4">
      <button appSidebarTrigger>☰</button>
      <h1>Page Title</h1>
    </header>
    <main class="p-4">
      <!-- Your page content -->
    </main>
  </app-sidebar-inset>
</app-sidebar-provider>
```

## Keyboard Shortcuts

- **Ctrl+B** (Windows/Linux) or **Cmd+B** (Mac): Toggle sidebar
- **Tab**: Navigate through focusable elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close mobile sidebar (when using Sheet)

## Mobile Behavior

On screens smaller than 768px (md breakpoint):
- The sidebar automatically switches to a Sheet-based drawer
- Opens from the configured side (`left` or `right`)
- Includes overlay with click-to-close
- Disables body scroll when open
- Can be closed with swipe gesture (Sheet feature)

## Service API

Access the sidebar programmatically via `SidebarService`:

```typescript
import { Component, inject } from '@angular/core';
import { SidebarService } from '@/app/components/sidebar';

@Component({...})
export class MyComponent {
  private sidebarService = inject(SidebarService);

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  openSidebar() {
    this.sidebarService.setOpen(true);
  }

  closeSidebar() {
    this.sidebarService.setOpen(false);
  }

  get isOpen() {
    return this.sidebarService.open();
  }

  get isMobile() {
    return this.sidebarService.isMobile();
  }

  get state() {
    return this.sidebarService.state(); // 'expanded' | 'collapsed'
  }
}
```

## Styling

The component uses CSS custom properties for theming:

```css
:root {
  --sidebar-width: 16rem;
  --sidebar-width-icon: 3rem;
  --sidebar-background: var(--bs-white);
  --sidebar-foreground: var(--bs-dark);
  --sidebar-border: rgba(0, 0, 0, 0.1);
  --sidebar-accent: rgba(var(--bs-primary-rgb), 0.1);
  --sidebar-accent-foreground: var(--bs-primary);
}
```

## Accessibility

- Uses semantic HTML (`nav`, `ul`, `li`, `button`)
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Respects `prefers-reduced-motion`
- High contrast mode compatible

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Notes

- The sidebar integrates with the `Sheet` component for mobile behavior
- State can be persisted using cookies (implement via `openChange` event)
- The `SidebarProvider` uses Angular's `providedIn` for dependency injection
- All components are standalone and can be tree-shaken
- Icons are not included; use your preferred icon library (Bootstrap Icons, Heroicons, etc.)

## Differences from React Version

While this is a complete adaptation, some implementation details differ:

- **Signals instead of hooks**: Uses Angular Signals for reactive state
- **Directives for behavior**: `appSidebarTrigger` instead of polymorphic components
- **ControlValueAccessor**: `SidebarInput` integrates with Angular forms
- **HostBindings**: Uses Angular's host bindings for dynamic classes/attributes
- **No Slot primitive**: Uses `<ng-content>` for projection

Despite these differences, the API and behavior match the React version as closely as possible.

## License

MIT
