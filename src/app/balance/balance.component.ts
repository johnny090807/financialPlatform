import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Invoice} from "../objects/invoice";
import {InvoiceLists} from "../objects/invoiceLists";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'balanceSheet',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  @Input() data: Invoice[] = [];
  @Input() invoiceList: any;
  costs:any = []
  selectedValue: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.data, this.invoiceList)

    this.data.forEach(row => {
      let found = false;
      this.costs.forEach((cost:any) => {
        if (cost.type == row.type){
          cost.cost += row.cost
          found = true
          return;
        }
      })
      if (found){
        return;
      }
      this.costs.push({
        'type': row.type,
        'cost': row.cost
      })
    })
    console.log(this.costs)
  }

}
