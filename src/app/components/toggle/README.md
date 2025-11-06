# Toggle Component

Angular adaptation of Radix UI Toggle. A flexible toggle button with variant and size support.

## Features
- Toggle button with on/off state
- Variants: `default`, `outline`
- Sizes: `default`, `sm`, `lg`
- Accessible and responsive
- Standalone component

## Usage

```html
<app-toggle
  [state]="isBold ? 'on' : 'off'"
  [variant]="'outline'"
  [size]="'lg'"
  (click)="isBold = !isBold"
>
  <i class="bi bi-type-bold"></i>
</app-toggle>
```

## API
| Input      | Type      | Default   | Description                |
|------------|-----------|-----------|----------------------------|
| state      | 'on'/'off'| 'off'     | Toggle state               |
| variant    | string    | 'default' | Visual style variant       |
| size       | string    | 'default' | Size variant               |
| className  | string    | ''        | Extra CSS classes          |
| disabled   | boolean   | false     | Disabled state             |
| ariaInvalid| boolean   | null      | ARIA invalid state         |

## Styling
- Use `variant` and `size` for custom appearance
- Focus/active states for accessibility
- SVG icons auto-sized

## License
MIT
