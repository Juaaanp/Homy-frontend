import { Component } from '@angular/core';

@Component({
  selector: 'app-card-footer',
  standalone: true,
  template: `<div data-slot="card-footer" class="card-footer"><ng-content></ng-content></div>`,
  styles: [``]
})
export class CardFooterComponent {}
