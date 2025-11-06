import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-footer',
  standalone: true,
  template: `<div class="dlg-footer"><ng-content></ng-content></div>`,
  styles: [`.dlg-footer { display:flex; gap:8px; justify-content:flex-end; margin-top:12px }`]
})
export class DialogFooterComponent {}
