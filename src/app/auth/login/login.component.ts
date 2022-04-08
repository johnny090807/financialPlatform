import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('',  [Validators.required, Validators.minLength(8)])
  })
  constructor(private authService: AuthService,
              private fb: FormBuilder,) { }

  ngOnInit(): void {
  }

  getEmailError() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'Email is required';
    }

    return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  Login() {
    this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password)
  }
}
