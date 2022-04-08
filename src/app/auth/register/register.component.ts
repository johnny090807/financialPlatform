import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('',  [Validators.required, Validators.minLength(8)])
  })
  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  getEmailError() {
    if (this.registerForm.controls.email.hasError('required')) {
      return 'Email is required';
    }

    return this.registerForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  Register() {
    this.authService.SignUp(this.registerForm.value.email, this.registerForm.value.password)
  }
}
