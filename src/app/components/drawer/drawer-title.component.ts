import { Component } from '@angular/core';

@Component({
  selector: 'app-drawer-title',
  standalone: true,
  template: `<h3 class="dr-title"><ng-content></ng-content></h3>`,
  styles: [`.dr-title{margin:0;font-weight:600}`]
})
export class DrawerTitleComponent {}
