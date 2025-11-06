import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-description',
  standalone: true,
  template: `<p class="dlg-desc"><ng-content></ng-content></p>`,
  styles: [`.dlg-desc { margin:0; color:var(--muted,#666); font-size:0.95rem }`]
})
export class DialogDescriptionComponent {}
