import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu-group',
  standalone: true,
  template: `<div class="dm-group"><ng-content></ng-content></div>`,
  styles: [`.dm-group{padding:2px 0}`]
})
export class DropdownMenuGroupComponent {}
