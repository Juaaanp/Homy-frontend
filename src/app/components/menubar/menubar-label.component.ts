import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menubar-label',
  standalone: true,
  template: `<div class="mb-label" [class.mb-inset]="inset"><ng-content></ng-content></div>`,
  styles: [`.mb-label{padding:6px 8px;font-size:12px;color:var(--muted,#666)} .mb-inset{padding-left:28px}`]
})
export class MenubarLabelComponent { @Input() inset = false }
