import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {InvoiceService} from "../invoice.service";
import {Invoice} from "../../objects/invoice";

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit, OnDestroy {
  @Input() loggedInUser: any
  @Input() invoiceUid: any
  @Input() editingInvoice: any
  invoiceForm = new FormGroup({
    VAT: new FormControl(""),
    type: new FormControl(""),
    cost: new FormControl(""),
  })
  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    if (this.editingInvoice != undefined){
      this.invoiceForm.patchValue(this.editingInvoice)
    }
    console.log(this.editingInvoice)
  }
  ngOnDestroy() {
    this.editingInvoice = undefined
  }

  submit(){
    let i = this.invoiceForm.value

    if (this.editingInvoice){
      let invoice: Invoice = {
        "VAT": i.VAT,
        "type": i.type,
        "cost": i.cost,
        "uid": this.editingInvoice.uid
      }
      this.invoiceService.updateInvoiceOnInvoiceList(
        this.loggedInUser,
        this.invoiceUid,
        invoice)
      return;
    }

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
