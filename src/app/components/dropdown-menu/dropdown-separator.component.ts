import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu-separator',
  standalone: true,
  template: `<div class="dm-sep"></div>`,
  styles: [`.dm-sep{height:1px;margin:6px -4px;background:var(--border,#eee)}`]
})
export class DropdownMenuSeparatorComponent {}
