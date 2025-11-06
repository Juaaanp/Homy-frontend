import { Component } from '@angular/core';

@Component({
  selector: 'app-card-title',
  standalone: true,
  template: `<h5 data-slot="card-title" class="card-title mb-0"><ng-content></ng-content></h5>`,
  styles: [``]
})
export class CardTitleComponent {}
