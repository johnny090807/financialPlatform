import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InvoiceService} from "../invoice.service";
import {Invoice} from "../../objects/invoice";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit, OnDestroy {
  @Input() loggedInUser: any
  invoiceUid: any
  @Input() editingInvoice: any
  invoiceForm = new FormGroup({
    date: new FormControl("", Validators.required),
    period: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    invoiceNumber: new FormControl("", Validators.required),
    type: new FormControl("", Validators.required),
    cost: new FormControl("", Validators.required),
    VAT: new FormControl("", Validators.required),
  })
  constructor(private invoiceService: InvoiceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.editingInvoice != undefined){
      this.invoiceForm.patchValue(this.editingInvoice)
    }
    console.log(this.editingInvoice, this.invoiceUid, this.loggedInUser)
    this.invoiceUid = this.route.snapshot.paramMap.get('listId')
  }
  ngOnDestroy() {
    this.editingInvoice = undefined
  }

  submit(){
    let i = this.invoiceForm.value

    if (this.editingInvoice){
      let invoice: Invoice = {
        "name": i.name,
        "description": i.description,
        "invoiceNumber": i.invoiceNumber,
        "VAT": i.VAT,
        "type": i.type,
        "cost": i.cost,
        "date": i.date,
        "period": i.period,
        "uid": this.editingInvoice.uid
      }
      this.invoiceService.updateInvoiceOnInvoiceList(
        this.loggedInUser,
        this.invoiceUid,
        invoice)
      return;
    }

    let invoice: Invoice = {
      "name": i.name,
      "description": i.description,
      "invoiceNumber": i.invoiceNumber,
      "VAT": i.VAT,
      "type": i.type,
      "date": i.date,
      "period": i.period,
      "cost": i.cost,
    }

    this.invoiceService.addInvoiceToInvoiceList(
      this.loggedInUser,
      this.invoiceUid,
      invoice)
  }

}
