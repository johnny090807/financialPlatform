import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {InvoiceService} from "../invoice.service";
import {Invoice} from "../../objects/invoice";

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit {
  @Input() loggedInUser: any
  @Input() invoiceUid: any
  invoiceForm = new FormGroup({
    VAT: new FormControl(""),
    type: new FormControl(""),
    cost: new FormControl(""),
  })
  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
  }

  submit(){
    let i = this.invoiceForm.value
    let invoice: Invoice = {
      "VAT": i.VAT,
      "type": i.type,
      "cost": i.cost
    }
    this.invoiceService.addInvoiceToInvoiceList(
      this.loggedInUser,
      this.invoiceUid,
      invoice)
  }

}
