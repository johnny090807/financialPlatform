import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  displayedColumns = ["id", "element", "subelement", "location", "data"]
  dataSource = [{
    "id": "edaed039498fhuds",
    "element": "something",
    "subelement": "something",
    "location": "something",
    "data": "something"
  }]
  loading = true
  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn){
      if (!this.authService.isVerified){
        this._snackBar.open("You've not verified your email yet", "RESEND").onAction().subscribe(() => {
          this.authService.SendVerificationMail();
        }, error => {
          this._snackBar.open(error.message, "ok")
        })
      }
    }
    this.loading = false;

  }

}
