import { Component } from '@angular/core';

@Component({
  selector: 'app-command-empty',
  standalone: true,
  template: `<div data-slot="command-empty" class="ce-root"><ng-content></ng-content></div>`,
  styles: [`.ce-root { padding: 1.5rem; text-align:center; color:var(--muted-foreground,#6b7280); }`]
})
export class CommandEmptyComponent {}
