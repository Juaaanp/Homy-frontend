import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-command-shortcut',
  standalone: true,
  template: `<span data-slot="command-shortcut" class="cs-shortcut"><ng-content></ng-content></span>`,
  styles: [`.cs-shortcut { margin-left:auto; color:var(--muted-foreground,#6b7280); font-size:0.75rem; letter-spacing:0.08em; }`]
})
export class CommandShortcutComponent { @Input() className = '' }
