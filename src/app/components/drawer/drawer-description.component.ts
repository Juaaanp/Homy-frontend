import { Component } from '@angular/core';

@Component({
  selector: 'app-drawer-description',
  standalone: true,
  template: `<p class="dr-desc"><ng-content></ng-content></p>`,
  styles: [`.dr-desc{margin:0;color:var(--muted,#666);font-size:0.95rem}`]
})
export class DrawerDescriptionComponent {}
