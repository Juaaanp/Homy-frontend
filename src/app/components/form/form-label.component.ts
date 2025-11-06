import { Component, HostBinding } from '@angular/core';
import { FormFieldService } from './form-field.service';

@Component({
  selector: 'app-form-label',
  standalone: true,
  template: `<label data-slot="form-label" [attr.for]="forId" [attr.data-error]="hasError"><ng-content></ng-content></label>`,
})
export class FormLabelComponent {
  constructor(private field: FormFieldService) {}

  get forId() {
    return `${this.field.id}-form-item`;
  }

  // expose a convenient property for styling
  get hasError() {
    // consumers can style based on [data-error]
    // we don't synchronously know errors here; consumers may rely on message element
    return null;
  }
}
