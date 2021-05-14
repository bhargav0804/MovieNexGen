import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  Validators,
  ValidationErrors,
  SelectControlValueAccessor,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginApiService } from '../services/login-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    password1: new FormControl(''),
    confirmPassword: new FormControl(''),
    dateOfBirth: new FormControl(''),
    gender: new FormControl(''),
  });

  today = new Date();
  registerFormData: any = {};
  userExistFlag: boolean = false;
  

  get email() {
    return this.registerForm.get('email');
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get dateOfBirth() {
    return this.registerForm.get('dateOfBirth');
  }
  get gender() {
    return this.registerForm.get('gender');
  }
  constructor(
    private fb: FormBuilder,
    private _loginService: LoginApiService,
    private route: Router,private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[6-9]\\d{9}'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(
          '(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });

    this.registerForm.setValidators(MustMatch());
  }

  async isUserExist(email: string): Promise<boolean> {
    let data = await this._loginService.getUserByEmail(email).toPromise();
    
    if (data.Email != null) {
      this.userExistFlag = true;
    }
    return this.userExistFlag;
  }

 async register() {
    this.registerFormData['name'] =
      this.registerForm.get('firstName').value +
      ' ' +
      this.registerForm.get('lastName').value;
    this.registerFormData['email'] = this.registerForm.get('email').value;
    this.registerFormData['PhoneNumber'] = this.registerForm.get(
      'phoneNumber'
    ).value;
    this.registerFormData['Password'] = this.registerForm.get('password').value;
    this.registerFormData['DateOfBirth'] = this.registerForm.get(
      'dateOfBirth'
    ).value;
    this.registerFormData['Gender'] = this.registerForm.get('gender').value;
      let flag = await this.isUserExist(this.registerFormData.email);
    if (!flag) {
      this._loginService
        .registerUser(this.registerFormData)
        .subscribe((result) => {
          this.toastr.success("Register successfully..")
          this.route.navigate(['login']);
        });
    } else {
      
      this.toastr.warning("User already exist with this Email Id.")
      this.userExistFlag = false;
    }
  }
}

export function MustMatch(): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors => {
    const control = formGroup.controls['password'];
    const matchingControl = formGroup.controls['confirmPassword'];
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
    return;
  };
}
