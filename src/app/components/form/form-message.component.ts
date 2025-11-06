import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormFieldService } from './form-field.service';

@Component({
  selector: 'app-form-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p *ngIf="message" data-slot="form-message" [id]="msgId" class="text-destructive text-sm">{{ message }}</p>
  `,
})
export class FormMessageComponent implements OnInit, OnDestroy {
  message: string | null = null;
  private sub?: Subscription;

  constructor(private field: FormFieldService) {}

  get msgId() {
    return `${this.field.id}-form-item-message`;
  }

  ngOnInit(): void {
    this.sub = this.field.errors$?.subscribe(err => {
      if (!err) {
        this.message = null;
        return;
      }
      // pick the first error message
      const firstKey = Object.keys(err)[0];
      const value = err[firstKey];
      // simple messages for common validators
      switch (firstKey) {
        case 'required':
          this.message = 'Este campo es obligatorio.';
          break;
        case 'minlength':
          this.message = `Mínimo ${value.requiredLength} caracteres.`;
          break;
        case 'maxlength':
          this.message = `Máximo ${value.requiredLength} caracteres.`;
          break;
        case 'email':
          this.message = 'Formato de correo inválido.';
          break;
        default:
          this.message = String(value || firstKey);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
