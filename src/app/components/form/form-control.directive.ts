import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormFieldService } from './form-field.service';

@Directive({ selector: '[formControlSlot]' })
export class FormControlSlotDirective implements OnInit, OnDestroy {
  private sub?: Subscription;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private field: FormFieldService,
    private ngControl: NgControl | null,
  ) {}

  ngOnInit(): void {
    const id = `${this.field.id}-form-item`;
    const descId = `${this.field.id}-form-item-description`;
    const msgId = `${this.field.id}-form-item-message`;

    // set id on host
    this.renderer.setAttribute(this.el.nativeElement, 'id', id);
    // set aria-describedby (will be updated by errors)
    this.renderer.setAttribute(this.el.nativeElement, 'aria-describedby', descId);

    if (this.ngControl && this.ngControl.control) {
      // push initial errors
      this.field.setErrors(this.ngControl.control.errors ?? null);

      this.sub = this.ngControl.control.statusChanges?.subscribe(() => {
        this.field.setErrors(this.ngControl?.control?.errors ?? null);
        const hasError = !!(this.ngControl?.control?.invalid && (this.ngControl?.control?.touched || this.ngControl?.control?.dirty));
        if (hasError) {
          this.renderer.setAttribute(this.el.nativeElement, 'aria-invalid', 'true');
          // include message id when error
          this.renderer.setAttribute(this.el.nativeElement, 'aria-describedby', `${descId} ${msgId}`);
        } else {
          this.renderer.removeAttribute(this.el.nativeElement, 'aria-invalid');
          this.renderer.setAttribute(this.el.nativeElement, 'aria-describedby', descId);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
