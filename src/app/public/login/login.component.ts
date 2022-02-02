import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidationService } from 'src/app/shared/services/custom-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted: boolean = false;

  constructor(public fb: FormBuilder, private router: Router, public validationService: CustomValidationService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, this.validationService.validateEmail()]],
      password: ['', Validators.required]
    })
  }

  doLogin() {
    if (this.loginForm.valid) {
      this.router.navigate(['/hospital/patient-list']);
    } else {
      this.submitted = true;
    }
  }

}
