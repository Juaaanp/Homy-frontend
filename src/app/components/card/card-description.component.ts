import { Component } from '@angular/core';

@Component({
  selector: 'app-card-description',
  standalone: true,
  template: `<p data-slot="card-description" class="card-text text-muted mb-0"><ng-content></ng-content></p>`,
  styles: [``]
})
export class CardDescriptionComponent {}
