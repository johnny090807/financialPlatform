import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvoiceService} from "../invoice.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Invoice} from "../../objects/invoice";

@Component({
  selector: 'app-vat-not-payed',
  templateUrl: './vat-not-payed.component.html',
  styleUrls: ['./vat-not-payed.component.scss']
})
export class VatNotPayedComponent implements OnInit {
  displayedColumns = ["date", "period", "name", "description", "invoiceNumber", "cost", "type", "VAT", "actions"]
  @Input() dataSource:any = []
  loggedInUser: any
  @Input() invoiceListId:any = {}

  @Output("updateComponents") updateComponents: EventEmitter<any> = new EventEmitter();
  constructor(private invoiceService: InvoiceService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!)
    this.filterList()
  }

  filterList(){
    this.dataSource = this.dataSource.filter((row: any) => row.vat_payed == false)
  }

  notPayed(element: Invoice) {
    element.vat_payed = true
    this.invoiceService.updateInvoiceOnInvoiceList(this.loggedInUser, this.invoiceListId, element).then(() => {
      this._snackBar.open("Invoice updated.", "OK")
      this.filterList()

    })
  }
}
