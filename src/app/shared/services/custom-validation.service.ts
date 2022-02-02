import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }

  checkEmailPattern(email) {
    const re = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
    return re.test(email);
  }


  validateMobile(phone) {
    const re = new RegExp(/^\+[0-9]{8,15}$/);
    return re.test(phone);
  }

  validateEmail(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      return (this.checkEmailPattern(control.value) || this.validateMobile(control.value)) ? null : { invalidInput: true };
    };
  }


}
