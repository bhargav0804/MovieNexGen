import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/api.service';
import { SessionService } from 'src/app/user/session.service';
import { LoginApiService } from '../services/login-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormData: any = {};
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private _loginService: LoginApiService,
    private sessionService: SessionService,
    private _apiService:APIService,
    private toastr:ToastrService
  ) {
  }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  hide = true;
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(
          '(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
        ),
      ]),
    });
  }
  gotoRegister() {
    this.route.navigate(['register']);
  }
  logIn() {
    this.loginFormData['email'] = this.loginForm.get('email').value;
    this.loginFormData['password'] = this.loginForm.get('password').value;

    this._loginService.loginUser(this.loginFormData).subscribe({
      next: (data) => {
        if (data.token == null) {
          if (data.user == null) {
            this.toastr.warning("User doesn't exist with this credentials..");
            
          } else {
            this.toastr.warning("User is blocked due to: "+data.user.BlockMessage)
          }
        } else {
          this.sessionService.setLocalSession(data.token, data.user);

          this._apiService.updateProfileLocally();
          if (data.user.RoleName == 'User') this.route.navigate(['user']);
          else this.route.navigate(['admin']);
        }
      },
    });
  }
}
