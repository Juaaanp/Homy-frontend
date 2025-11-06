import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

let nextId = 0;

@Injectable()
export class FormFieldService {
  readonly id = `form-field-${++nextId}`;
  private _errors$ = new BehaviorSubject<ValidationErrors | null>(null);
  readonly errors$ = this._errors$.asObservable();

  setErrors(errors: ValidationErrors | null) {
    this._errors$.next(errors);
  }
}
