import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-header',
  standalone: true,
  template: `<div class="dlg-header"><ng-content></ng-content></div>`,
  styles: [`.dlg-header { display:flex; flex-direction:column; gap:8px; margin-bottom:8px }`]
})
export class DialogHeaderComponent {}
