import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu-item',
  standalone: true,
  template: `
    <div
      class="cm-item"
      [attr.data-variant]="variant"
      [class.cm-inset]="inset"
      (click)="onClick($event)"
      role="menuitem"
      tabindex="0"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .cm-item { padding: 6px 8px; cursor: default; border-radius: 4px; }
      .cm-item:hover, .cm-item:focus { background: rgba(0,0,0,0.04); }
      .cm-item[data-variant='destructive'] { color: var(--destructive, #b91c1c); }
      .cm-inset { padding-left: 28px; }
    `,
  ],
})
export class ContextMenuItemComponent {
  @Input() inset = false;
  @Input() variant: 'default' | 'destructive' = 'default';
  @Output() itemSelect = new EventEmitter<Event>();

  onClick(e: Event) {
    this.itemSelect.emit(e);
  }
}
