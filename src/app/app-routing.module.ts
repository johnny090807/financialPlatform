import { NgModule } from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {LogoutComponent} from "./auth/logout/logout.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ForgotComponent} from "./auth/forgot/forgot.component";
import {InvoiceComponent} from "./invoice/invoice.component";
import {AuthService} from "./auth/auth.service";
import {InvoiceListComponent} from "./invoice/invoice-list/invoice-list.component";

const routes: Routes = [
  {component: LoginComponent, path: "Login"},
  {component: LogoutComponent, path: "Logout"},
  {component: RegisterComponent, path: "Register"},
  {component: InvoiceComponent, path: "Invoice", canActivate: [AuthService]},
  {component: InvoiceListComponent, path: "Invoice/:listId", canActivate: [AuthService]},
  {component: ForgotComponent, path: "Forgot"},
  {component: HomeComponent, path: "**"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
