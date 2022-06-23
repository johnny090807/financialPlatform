import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Invoice} from "../../objects/invoice";
import {InvoiceService} from "../invoice.service";
import {MatSnackBar} from "@angular/material/snack-bar";

enum notPayedType{
  INVOICE = 0,
  VAT = 1
}

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
  @Input() type: notPayedType = 0

  @Output("updateComponents") updateComponents: EventEmitter<any> = new EventEmitter();
  constructor(private invoiceService: InvoiceService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!)
    console.log(this.type)
  }

  filterList(){
    this.dataSource = this.dataSource.filter((row: any) => row.payed == false)
  }

  notPayed(element: Invoice) {
    if (this.type == notPayedType.INVOICE){
      element.payed = true
    }
    if (this.type == notPayedType.VAT){
      element.vat_payed = true
    }
    this.invoiceService.updateInvoiceOnInvoiceList(this.loggedInUser, this.invoiceListId, element).then(() => {
      this._snackBar.open("Invoice updated.", "OK")
      this.filterList()

    })
  }
}
