import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu-label',
  standalone: true,
  template: `<div class="dm-label" [class.dm-inset]="inset"><ng-content></ng-content></div>`,
  styles: [`.dm-label{padding:6px 8px;font-size:12px;color:var(--muted,#666)} .dm-inset{padding-left:28px}`]
})
export class DropdownMenuLabelComponent { @Input() inset = false }
