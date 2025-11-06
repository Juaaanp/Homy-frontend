# Tooltip Components

Angular adaptation of Radix UI Tooltip. Provides flexible tooltip primitives for custom tooltips.

## Components
- TooltipProvider
- Tooltip
- TooltipTrigger
- TooltipContent

## Usage

```html
<app-tooltip>
  <app-tooltip-trigger>
    <button class="btn btn-secondary">Hover me</button>
  </app-tooltip-trigger>
  <app-tooltip-content side="bottom">
    Tooltip text here
  </app-tooltip-content>
</app-tooltip>
```

## API
### TooltipProvider
| Input         | Type    | Default | Description         |
|---------------|---------|---------|---------------------|
| delayDuration | number  | 0       | Delay before show   |

### Tooltip
| Input         | Type    | Default | Description         |
|---------------|---------|---------|---------------------|
| delayDuration | number  | 0       | Delay before show   |

### TooltipTrigger
No inputs. Use as wrapper for trigger element.

### TooltipContent
| Input      | Type    | Default | Description         |
|------------|---------|---------|---------------------|
| className  | string  | ''      | Extra CSS classes   |
| sideOffset | number  | 0       | Offset from trigger |
| side       | string  | 'top'   | Tooltip position    |

## Styling
- Animations for fade, zoom, slide
- Arrow indicator
- Responsive and accessible

## License
MIT
