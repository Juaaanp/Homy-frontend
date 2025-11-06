import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menubar-item',
  standalone: true,
  template: `
    <div class="mb-item" [class.mb-inset]="inset" [attr.data-variant]="variant" (click)="onClick($event)" role="menuitem" tabindex="0">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `.mb-item{padding:6px 8px;border-radius:4px;display:flex;align-items:center;gap:8px;cursor:pointer} .mb-item:hover{background:rgba(0,0,0,0.04)} .mb-inset{padding-left:28px}`,
  ],
})
export class MenubarItemComponent {
  @Input() inset = false;
  @Input() variant: 'default' | 'destructive' = 'default';
  @Output() itemSelect = new EventEmitter<Event>();

  onClick(e: Event) {
    this.itemSelect.emit(e);
  }
}
