import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InvoiceService} from "./invoice.service";
import {InvoiceLists} from "../objects/invoiceLists";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  displayedColumns = ["id", "element", "subelement", "location", "actions"]
  lists = [{
    uid: "nothing",
    name: "New list"
  }]
  dataSource:any = []
  loading = true
  loggedInUser: any
  selectedInvoiceList:any
  editing = false;
  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.authService.verifyEmail()
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!)
    this.invoiceService.getAllInvoiceListsByUser(this.loggedInUser).subscribe(res => {
      this.lists = []
      res.forEach((data:any) => {
        this.lists.push(data)
      })
      this.loading = false;
    }, error => {
      this._snackBar.open(error.message, "ok")
    })
  }

  selectInvoice(uid: string) {
    this.loading = true;
    this.selectedInvoiceList = uid;
    this.invoiceService.getAllInvoices(this.loggedInUser, uid).subscribe(data => {
      this.dataSource = data;
      this.loading = false;
    }, error => {
      this._snackBar.open(error.message, "ok")
    })
  }

  addNewList() {
    this.invoiceService.addInvoiceListToUser(this.loggedInUser).then((res) => {
    }, error => {
      this._snackBar.open(error, "ok")
    })

  }

  deleteFromLists(uid: string) {
    if(window.confirm("Do you want to remove this list?")){
      this.invoiceService.deleteInvoiceList(this.loggedInUser, uid)
    }
  }

  editList(uid: string, index: number) {
    let text;
    let output = window.prompt("Please enter a name:", this.lists[index].name)
    if (output == "" || output == null){
      text = "New list"
    }else if(output.length > 25){
      this._snackBar.open("Invoice list name can't be longer than 25.", "ok")
      text = "New list"
    }
    else{
      text = output
    }
    this.invoiceService.updateInvoiceListName(this.loggedInUser, uid, text)
  }

  addNewInvoice() {
    this.editing = !this.editing
  }

  deleteInvoice(uid: string) {
    if(window.confirm("Do you want to remove this invoice?")) {
      this.invoiceService.deleteInvoice(this.loggedInUser, this.selectedInvoiceList, uid)
    }
  }
}
