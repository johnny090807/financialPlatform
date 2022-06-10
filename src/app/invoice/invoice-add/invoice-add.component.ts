import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InvoiceService} from "../invoice.service";
import {Invoice} from "../../objects/invoice";
import {ActivatedRoute} from "@angular/router";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit, OnDestroy {
  @Input() loggedInUser: any
  invoiceUid: any
  @Input() editingInvoice: any

  @Output("updateComponents") updateComponents: EventEmitter<any> = new EventEmitter();
  @Output("closeForm") closeForm: EventEmitter<any> = new EventEmitter();

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
  options: string[] = [
    'Travel costs',
    'Pension',
    'Study costs',
    'Office equipment',
    'Small inventory',
    'Literature',
    'Telephone costs',
    'Computer costs',
    'Foundation costs',
    'Promotion/Sponsor costs',
    'Representation costs',
    'Bank costs',
    'Insurance',
    'Other general costs',
    'Deprecation inventory',
    'Inventory(Fixed Asset)',
    'Debtors',
    'Work in progress',
    'Other receivables and assets',
    'Own Capital',
    'Last year',
    'Other Liabilities'
  ];
  filteredOptions!: Observable<string[]>;

  constructor(private invoiceService: InvoiceService,
              private route: ActivatedRoute,
              private _snackbar: MatSnackBar) { }

  ngOnInit(): void {

    this.filteredOptions = this.invoiceForm.controls.type.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    if (this.editingInvoice != undefined){
      this.invoiceForm.patchValue(this.editingInvoice)
    }
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
        invoice).then(() => {
        this.updateComponents.emit()
        this._snackbar.open("Invoice updated succesfully", "OK")
      })
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
      "payed": true
    }

    this.invoiceService.addInvoiceToInvoiceList(
      this.loggedInUser,
      this.invoiceUid,
      invoice).then(() => {
        this.updateComponents.emit()
      this._snackbar.open("Invoice added succesfully", "OK")
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  clearForm() {
    this.invoiceForm.reset()
    this.editingInvoice = undefined

  }

  close() {
    this.closeForm.emit()
  }
}
