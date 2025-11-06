import { Component } from '@angular/core';

@Component({
  selector: 'app-card-content',
  standalone: true,
  template: `<div data-slot="card-content" class="card-body"><ng-content></ng-content></div>`,
  styles: [``]
})
export class CardContentComponent {}
