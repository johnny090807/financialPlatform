import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {LogoutComponent} from "./auth/logout/logout.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ForgotComponent} from "./auth/forgot/forgot.component";

const routes: Routes = [
  {component: LoginComponent, path: "Login"},
  {component: LogoutComponent, path: "Logout"},
  {component: RegisterComponent, path: "Register"},
  {component: ForgotComponent, path: "Forgot"},
  {component: HomeComponent, path: "**"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
