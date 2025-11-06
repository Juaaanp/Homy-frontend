import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-context-menu-shortcut',
  standalone: true,
  template: `<span class="cm-shortcut"><ng-content></ng-content></span>`,
  styles: [
    `
      .cm-shortcut { margin-left: auto; font-size:11px; color:var(--muted,#666); }
    `,
  ],
})
export class ContextMenuShortcutComponent {
  @Input() className?: string;
}
