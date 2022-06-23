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
  Balances: any=[];

  constructor() { }

  ngOnInit(): void {
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
    let not_list:any;
    not_list=['Inventory(Fixed Asset)', 'Debtors', 'Other receivables and assets',
      'Own Capital','Last year','Other Liabilities']
    not_list.forEach((item:any) => {
      this.costs.forEach((data: any, index: number) => {
          if(data.type == item){
            this.costs.splice(index,1)
            return;
          }
      })
    })

    let Inventory=0 ;
    let Debtors=0;
    let Other_asset=0;
    let Liquid_asset=0;
    let Own_capital=0;
    let Last_year=0;
    let Current_year=0;
    let credit=0;
    let tax=0;
    let other_liability=0;
    let not_payed=0;
    let LIABILITY: any;
    let Capacity:any;
    let Check:any;

    for(let i=0; i<this.data.length;i++){
      if(this.data[i].type=='Inventory(Fixed Asset)'){
        if(this.data[i].cost>0){
          Inventory = Inventory + this.data[i].cost
        }
      }
    }
    for(let i=0; i<this.data.length;i++){
      if(this.data[i].type=='Debtors'){
        if(this.data[i].cost<0){
          Debtors = Debtors+-1*this.data[i].cost
        }
      }
    }
    for(let i=0; i<this.data.length;i++){
      if(this.data[i].type=='Other receivables and assets'){
        if(this.data[i].cost>0){
          Other_asset = Other_asset+-1*this.data[i].cost
        }
      }
    }
    for(let i=0; i<this.data.length;i++) {
        Liquid_asset = Liquid_asset + this.data[i].cost
    }
    for(let i=0; i<this.data.length;i++) {
      if (this.data[i].type == 'Own Capital') {
        Own_capital = Own_capital + this.data[i].cost
      }
    }
    for(let i=0; i<this.data.length;i++) {
      if (this.data[i].type == 'Last Year') {
        Last_year = Last_year + this.data[i].cost
      }
    }


    for(let i=0; i<this.data.length;i++) {
      if(this.data[i].cost>0){
        if(this.data[i].vat_payed==false){
          tax=tax+this.data[i].cost*0.01*this.data[i].VAT
        }
      }
    }
    for(let i=0; i<this.data.length;i++) {
      if(this.data[i].cost<0){
        if(this.data[i].vat_payed==false){
          tax=tax+this.data[i].cost*0.01*this.data[i].VAT*-1
        }
      }
    }
    for(let i=0; i<this.data.length; i++){
      if(this.data[i].cost<0){
        if(this.data[i].payed==false){
          not_payed=not_payed+-1*this.data[i].cost
        }
      }
    }
    for(let i=0;i<this.data.length;i++) {
      if(this.data[i].cost<0){
        if(this.data[i].type=='Other Liability'){
          other_liability=other_liability+-1*this.data[i].cost
        }
      }
    }
    let not=0;
    for(let i=0; i<this.data.length; i++) {
      for (let j = 0; j < not_list.length; j++) {
            if (this.data[i].type == not_list[j]) {
              not = not + this.data[i].cost
            }
          }
        }
    console.log(not)
    Current_year=Liquid_asset-tax-not_payed-other_liability-not
    LIABILITY=tax+other_liability+not_payed
    Capacity=Own_capital+Last_year+Current_year
    Check= Liquid_asset+Debtors+Other_asset-Capacity-LIABILITY


    this.Balances.push({
      'Inventory':Math.round(Inventory),
      'Fixed_asset':Math.round(Inventory),
      'Debtors':Math.round(Debtors),
      'Other_asset':Math.round(Other_asset),
      'Receivables':Math.round(Debtors)+Math.round(Other_asset),
      'liquid_asset':Math.round(Liquid_asset),
      'total_asset':Math.round(Liquid_asset)+Math.round(Debtors)+Math.round(Other_asset),
      'Own_capital':Math.round(Own_capital),
      'Last_year':Math.round(Last_year),
      'Capacity':Math.round(Capacity),
      'Current_year':Math.round(Current_year),
      'Credit':Math.round(not_payed),
      'tax':Math.round(tax),
      'other_liability': Math.round(other_liability),
      'LIABILITY':Math.round(LIABILITY),
      'total_liability':Math.round(Capacity)+Math.round(LIABILITY),
      'Check':Math.round(Check)
    })
    console.log(this.Balances[0])
  }

}
