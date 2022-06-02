import { NgModule } from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ForgotComponent} from "./auth/forgot/forgot.component";
import {AccountancyComponent} from "./invoice/accountancy.component";
import {AuthService} from "./auth/auth.service";
import {InvoiceListComponent} from "./invoice/invoice-list/invoice-list.component";
import {ChartsComponent} from "./charts/charts.component";


const routes: Routes = [
  {component: LoginComponent, path: "Login"},
  {component: RegisterComponent, path: "Register"},
  {component: AccountancyComponent, path: "Invoice", canActivate: [AuthService]},
  {component: InvoiceListComponent, path: "Invoice/:listId", canActivate: [AuthService]},
  {component: ChartsComponent, path: "Invoice/:listId/Charts", canActivate: [AuthService]},
  {component: ForgotComponent, path: "Forgot"},
  {component: HomeComponent, path: "**"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
