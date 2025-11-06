import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-title',
  standalone: true,
  template: `<h2 class="dlg-title"><ng-content></ng-content></h2>`,
  styles: [`.dlg-title { margin:0; font-size:1.125rem; font-weight:600 }`]
})
export class DialogTitleComponent {}
