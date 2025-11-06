import { Component } from '@angular/core';

@Component({
  selector: 'app-card-action',
  standalone: true,
  template: `<div data-slot="card-action" class="card-action"><ng-content></ng-content></div>`,
  styles: [`.card-action { justify-self: end; }`]
})
export class CardActionComponent {}
