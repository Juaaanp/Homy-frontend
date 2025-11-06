import { Component } from '@angular/core';

@Component({
  selector: 'app-command-separator',
  standalone: true,
  template: `<div data-slot="command-separator" class="cs-root" aria-hidden="true"></div>`,
  styles: [`.cs-root { height:1px; background:var(--border,#e5e7eb); margin:6px 0; }`]
})
export class CommandSeparatorComponent {}
