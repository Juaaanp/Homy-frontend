# ToggleGroup Component

Angular adaptation of the Radix UI ToggleGroup. Allows grouping toggle buttons with variant and size support.

## Features
- Grouped toggle buttons
- Variants: `default`, `outline`
- Sizes: `default`, `sm`, `lg`
- Responsive and accessible
- Standalone components

## Usage

```html
<app-toggle-group variant="outline" size="lg">
  <app-toggle-group-item value="bold">
    <i class="bi bi-type-bold"></i>
  </app-toggle-group-item>
  <app-toggle-group-item value="italic">
    <i class="bi bi-type-italic"></i>
  </app-toggle-group-item>
  <app-toggle-group-item value="underline">
    <i class="bi bi-type-underline"></i>
  </app-toggle-group-item>
</app-toggle-group>
```

## API

### ToggleGroup
| Input      | Type      | Default   | Description                |
|------------|-----------|-----------|----------------------------|
| variant    | string    | 'default' | Visual style variant       |
| size       | string    | 'default' | Size variant               |
| className  | string    | ''        | Extra CSS classes          |

### ToggleGroupItem
| Input      | Type      | Default   | Description                |
|------------|-----------|-----------|----------------------------|
| value      | string    | ''        | Value for the item         |
| variant    | string    | 'default' | Visual style variant       |
| size       | string    | 'default' | Size variant               |
| className  | string    | ''        | Extra CSS classes          |
| disabled   | boolean   | false     | Disabled state             |

## Styling
- Use `variant` and `size` for custom appearance
- First/last items get rounded corners
- Focus/active states for accessibility

## License
MIT
