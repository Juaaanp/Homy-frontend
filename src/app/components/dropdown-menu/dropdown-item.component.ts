import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu-item',
  standalone: true,
  template: `
    <div class="dm-item" [class.dm-inset]="inset" [attr.data-variant]="variant" (click)="onClick($event)" role="menuitem" tabindex="0">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .dm-item { padding:6px 8px; border-radius:4px; display:flex; align-items:center; gap:8px; cursor:pointer }
      .dm-item:hover, .dm-item:focus { background: rgba(0,0,0,0.04) }
      .dm-item[data-variant='destructive'] { color:var(--destructive,#b91c1c) }
      .dm-inset { padding-left:28px }
    `,
  ],
})
export class DropdownMenuItemComponent {
  @Input() inset = false;
  @Input() variant: 'default' | 'destructive' = 'default';
  @Output() itemSelect = new EventEmitter<Event>();

  onClick(e: Event) {
    this.itemSelect.emit(e);
  }
}
