import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-command-item',
  standalone: true,
  template: `<div role="option" class="ci-item" [class.disabled]="disabled" (click)="onClick()"><ng-content></ng-content></div>`,
  styles: [`.ci-item { padding:8px 10px; display:flex; gap:8px; align-items:center; cursor:pointer; } .ci-item.disabled { opacity:0.5; pointer-events:none; } .ci-item:hover { background:var(--accent,#f3f4f6); }`]
})
export class CommandItemComponent {
  @Input() disabled = false;
  @Output() select = new EventEmitter<void>();

  onClick() { if (!this.disabled) this.select.emit(); }
}
