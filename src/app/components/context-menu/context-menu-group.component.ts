import { Component } from '@angular/core';

@Component({
  selector: 'app-context-menu-group',
  standalone: true,
  template: `<div class="cm-group"><ng-content></ng-content></div>`,
  styles: [
    `
      .cm-group { padding: 2px 0; }
    `,
  ],
})
export class ContextMenuGroupComponent {}
