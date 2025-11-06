import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-context-menu-label',
  standalone: true,
  template: `<div class="cm-label" [class.cm-inset]="inset"><ng-content></ng-content></div>`,
  styles: [
    `
      .cm-label { padding:6px 8px; font-size:12px; color:var(--muted,#666); }
      .cm-inset { padding-left:28px }
    `,
  ],
})
export class ContextMenuLabelComponent {
  @Input() inset = false;
}
