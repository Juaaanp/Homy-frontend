import { Component } from '@angular/core';

@Component({
  selector: 'app-context-menu-separator',
  standalone: true,
  template: `<div class="cm-sep"></div>`,
  styles: [
    `
      .cm-sep { height:1px; margin:6px -4px; background:var(--border, #eee) }
    `,
  ],
})
export class ContextMenuSeparatorComponent {}
