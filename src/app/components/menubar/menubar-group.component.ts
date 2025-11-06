import { Component } from '@angular/core';

@Component({
  selector: 'app-menubar-group',
  standalone: true,
  template: `<div class="mb-group"><ng-content></ng-content></div>`,
  styles: [`.mb-group{padding:2px 0}`]
})
export class MenubarGroupComponent {}
