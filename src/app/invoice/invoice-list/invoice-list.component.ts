import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InvoiceService} from "../invoice.service";
import {Invoice} from "../../objects/invoice";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  displayedColumns = ["date", "period", "name", "description", "invoiceNumber", "cost", "type", "VAT", "actions"]
  dataSource:any = []
  loggedInUser: any
  editing = false;
  editingInvoice: any;
  paramId: any;
  constructor(public authService: AuthService,
              private _snackBar: MatSnackBar,
              private invoiceService: InvoiceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!)
    this.paramId = this.route.snapshot.paramMap.get('listId');
    this.invoiceService.getAllInvoices(this.loggedInUser, this.paramId).subscribe(data => {
      this.dataSource = data
    })
  }

  addNewInvoice() {
    this.editing = !this.editing
    this.editingInvoice = undefined
  }

  deleteInvoice(uid: string) {
    if(window.confirm("Do you want to remove this invoice?")) {
      this.invoiceService.deleteInvoice(this.loggedInUser, this.paramId, uid)
    }
  }

  editInvoice(invoice: Invoice) {

    this.editingInvoice = invoice
    this.editing = true
  }
}
