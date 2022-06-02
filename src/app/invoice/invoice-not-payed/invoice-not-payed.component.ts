import {Component, Input, OnInit} from '@angular/core';
import {Invoice} from "../../objects/invoice";
import {InvoiceService} from "../invoice.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-invoice-not-payed',
  templateUrl: './invoice-not-payed.component.html',
  styleUrls: ['./invoice-not-payed.component.scss']
})
export class InvoiceNotPayedComponent implements OnInit {
  displayedColumns = ["date", "period", "name", "description", "invoiceNumber", "cost", "type", "VAT", "actions"]
  @Input() dataSource:any = []
  loggedInUser: any
  @Input() invoiceListId:any = {}
  constructor(private invoiceService: InvoiceService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!)
    this.filterList()
  }

  filterList(){
    this.dataSource = this.dataSource.filter((row: any) => row.payed == false)
  }

  notPayed(element: Invoice) {
    element.payed = true
    this.invoiceService.updateInvoiceOnInvoiceList(this.loggedInUser, this.invoiceListId, element).then(() => {
      this._snackBar.open("Invoice updated.", "OK")
      this.filterList()

    })
  }
}
