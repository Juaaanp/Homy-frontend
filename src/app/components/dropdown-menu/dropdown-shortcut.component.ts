import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu-shortcut',
  standalone: true,
  template: `<span class="dm-shortcut"><ng-content></ng-content></span>`,
  styles: [`.dm-shortcut{margin-left:auto;font-size:11px;color:var(--muted,#666)}`]
})
export class DropdownMenuShortcutComponent {}
