import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms/src/model';

@Injectable()
export class ValidationMessageService {
  public requiredValidation(formControl: FormControl, form): boolean {
    return formControl.hasError('required') &&
    (formControl.dirty || formControl.touched || form.submitted );
  }
}
