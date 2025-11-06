import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<form [formGroup]="form" (ngSubmit)="onSubmit?.()"><ng-content></ng-content></form>`,
})
export class FormComponent {
  @Input() form!: FormGroup;
  @Input() onSubmit?: () => void;
}
