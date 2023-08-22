import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  constructor() {}
  isFieldInvalid(control: AbstractControl | null): boolean {
    return control ? control.invalid : false;
  }

  isFieldTouchedOrDirty(control: AbstractControl | null): boolean {
    return control ? control.touched || control.dirty : false;
  }

  isRequired(control: AbstractControl | null): boolean {
    return control ? control.hasError('required') : false;
  }

  isMinLength(control: AbstractControl | null): boolean {
    return control ? control.hasError('minlength') : false;
  }

  isMaxLength(control: AbstractControl | null): boolean {
    return control ? control.hasError('maxlength') : false;
  }

  isMin(control: AbstractControl | null): boolean {
    return control ? control.hasError('min') : false;
  }

  isMax(control: AbstractControl | null): boolean {
    return control ? control.hasError('max') : false;
  }

  isNotUrl(control: AbstractControl | null): boolean {
    return control ? control.hasError('pattern') : false;
  }
}
