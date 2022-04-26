import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InvoiceService} from "./invoice.service";
import {InvoiceLists} from "../objects/invoiceLists";
import {FormControl, FormGroup} from "@angular/forms";
import {formatDate} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-invoice',
  templateUrl: './accountancy.component.html',
  styleUrls: ['./accountancy.component.scss']
})
export class AccountancyComponent implements OnInit {
  lists: InvoiceLists[] = []
  loading = true
  loggedInUser: any
  editing = false
  editingList:any
  searchForm = new FormGroup({
    search: new FormControl('')
  })
  running = false
  invoiceListForm = new FormGroup({
    'name': new FormControl(''),
    'balance': new FormControl(''),
    'startDate': new FormControl(''),
    'endDate': new FormControl(''),
  })
  constructor(public authService: AuthService,
              private _snackBar: MatSnackBar,
              public router: Router,
              private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
    this.searchForm.controls.search.valueChanges.subscribe(()=>{
      if (this.running) {
        return;
      }
      this.running = true
      setTimeout(() => {
        this.getAllInvoiceLists()
        this.running = false
      }, 500)
    })
    this.loading = true;
    this.authService.verifyEmail()
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!)
    this.getAllInvoiceLists()

  }

  getAllInvoiceLists(){
    this.loading = true
    this.invoiceService.getAllInvoiceListsByUser(this.loggedInUser, this.searchForm.value.search).then(data => {
      this.lists = []
      data.forEach((item: any ) => {
        this.lists.push(item.data())
      })
      this.loading = false
    })
  }


  addNewList() {
    const list: InvoiceLists = {
      uid: "",
      name: this.invoiceListForm.value.name,
      name_lowercase: this.invoiceListForm.value.name.toLowerCase(),
      endDate: this.invoiceListForm.value.endDate,
      balance: this.invoiceListForm.value.balance,
      startDate: this.invoiceListForm.value.startDate
    }
    this.invoiceService.addInvoiceListToUser(this.loggedInUser, list).then((res) => {
    }, error => {
      this._snackBar.open(error, "ok")
    })
    this.getAllInvoiceLists()

  }

  deleteFromLists(uid: string) {
    if(window.confirm("Do you want to remove this list?")){
      this.invoiceService.deleteInvoiceList(this.loggedInUser, uid)
      this.getAllInvoiceLists()
    }
  }

  fillFormList(list: InvoiceLists){
    let format = 'yyyy-MM-dd'
    let locale = 'en-US'
    const formattedStartDate = formatDate(new Date(list.startDate), format, locale)
    const formattedEndDate = formatDate(new Date(list.endDate), format, locale)
    this.editing = true
    this.invoiceListForm.patchValue({
      name: list.name,
      balance: list.balance,
      startDate: formattedStartDate,
      endDate: formattedEndDate
    })
    this.editingList = list
  }

  editList() {
    let list: InvoiceLists = {
      uid: this.editingList.uid,
      endDate: this.invoiceListForm.value.endDate,
      name: this.invoiceListForm.value.name,
      name_lowercase: this.invoiceListForm.value.name.toLowerCase(),
      startDate: this.invoiceListForm.value.startDate,
      balance: this.invoiceListForm.value.balance,
    }
    this.invoiceService.updateInvoiceList(this.loggedInUser, list)
    this.getAllInvoiceLists()
  }

  clearForm() {
    this.editing = false;
    this.editingList = undefined
    this.invoiceListForm.patchValue({
      name:"",
      balance:"",
      startDate:"",
      endDate:"",
    })
  }

  goToInvoiceDetails(uid: string) {
    this.router.navigate(['/Invoice/' + uid])
  }
}
