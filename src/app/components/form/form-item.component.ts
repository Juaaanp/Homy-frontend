import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldService } from './form-field.service';

@Component({
  selector: 'app-form-item',
  standalone: true,
  imports: [CommonModule],
  providers: [FormFieldService],
  template: `<div data-slot="form-item" class="grid gap-2"><ng-content></ng-content></div>`,
})
export class FormItemComponent {
  constructor(public field: FormFieldService) {}
}
