import { Component } from '@angular/core';

@Component({
  selector: 'app-drawer-footer',
  standalone: true,
  template: `<div class="dr-footer"><ng-content></ng-content></div>`,
  styles: [`.dr-footer{padding:12px 16px;border-top:1px solid rgba(0,0,0,0.04);margin-top:auto}`]
})
export class DrawerFooterComponent {}
