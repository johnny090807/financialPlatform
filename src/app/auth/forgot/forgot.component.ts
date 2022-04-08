import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  })
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  getEmailError() {
    if (this.forgotForm.controls.email.hasError('required')) {
      return 'Email is required';
    }

    return this.forgotForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  sendForgotEmail() {
    this.authService.SendForgotEmail(this.forgotForm.value.email)
  }

}
