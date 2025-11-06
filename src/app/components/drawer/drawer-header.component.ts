import { Component } from '@angular/core';

@Component({
  selector: 'app-drawer-header',
  standalone: true,
  template: `<div class="dr-header"><ng-content></ng-content></div>`,
  styles: [`.dr-header{padding:12px 16px;border-bottom:1px solid rgba(0,0,0,0.04)}`]
})
export class DrawerHeaderComponent {}
