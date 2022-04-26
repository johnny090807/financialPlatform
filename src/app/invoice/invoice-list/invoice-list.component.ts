import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InvoiceService} from "../invoice.service";
import {Invoice} from "../../objects/invoice";
import {ActivatedRoute, Router} from "@angular/router";
import {toInteger} from "@ng-bootstrap/ng-bootstrap/util/util";

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
  invoiceListId: any;
  constructor(public authService: AuthService,
              private _snackBar: MatSnackBar,
              private invoiceService: InvoiceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!)
    this.invoiceListId = this.route.snapshot.paramMap.get('listId');
    this.invoiceService.getAllInvoices(this.loggedInUser, this.invoiceListId).onSnapshot((data)=> {
      this.dataSource = []
      data.forEach((data) => {
        this.dataSource.push(data.data())
      })
      this.updateCalculatedBalance()
    })
  }

  addNewInvoice() {
    this.editing = !this.editing
    this.editingInvoice = undefined
  }

  deleteInvoice(uid: string) {
    if(window.confirm("Do you want to remove this invoice?")) {
      this.invoiceService.deleteInvoice(this.loggedInUser, this.invoiceListId, uid)
    }
  }

  editInvoice(invoice: Invoice) {
    this.editing = false;
    this.editingInvoice = invoice
    setTimeout(() => {
      this.editing = true

    }, 500)
  }

  updateCalculatedBalance(){
    this.invoiceService.getSingleInvoiceList(this.loggedInUser, this.invoiceListId).subscribe(data => {
      let currentBalance = data.data()!.balance
      this.dataSource.map((data:any) => {
        currentBalance += Number(data.cost)
      })
      let changes = {
        'calculated_balance': currentBalance,
        'uid': this.invoiceListId
      }
      this.invoiceService.updateInvoiceList(this.loggedInUser,changes)
    })
  }

  notPayed(element: Invoice) {
    element.payed = !element.payed;
    let change = {
      "payed": element.payed,
      "uid": element.uid
    }
    this.invoiceService.updateInvoiceOnInvoiceList(this.loggedInUser, this.invoiceListId, change)
  }
}


