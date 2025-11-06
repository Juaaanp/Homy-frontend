import { Component } from '@angular/core';
import { FormFieldService } from './form-field.service';

@Component({
  selector: 'app-form-description',
  standalone: true,
  template: `<p data-slot="form-description" [id]="descId" class="text-muted text-sm"><ng-content></ng-content></p>`,
})
export class FormDescriptionComponent {
  constructor(private field: FormFieldService) {}

  get descId() {
    return `${this.field.id}-form-item-description`;
  }
}
