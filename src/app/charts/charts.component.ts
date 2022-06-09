import {Component, EventEmitter, Input, NgModule, OnInit, Output} from '@angular/core';
import {Invoice} from "../objects/invoice";
import { EChartsOption} from 'echarts';
import{ NgxEchartsModule} from 'ngx-echarts';
import {MatTableModule} from '@angular/material/table'
import {anySymbolName} from "@angular/core/schematics/migrations/typed-forms/util";


@NgModule({
  imports: [
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
})
export class AppModule {}


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  @Input() data: any[] = []
  @Input() invoiceList: any;
  options: any;
  option1: any;
  option2: any;
  //option3: any;
  Balance: any=[];
  cards: any=[];

  @Output("updateComponents") updateComponents: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['name', 'euro'];

  constructor() {
  }

  ngOnInit(): void {
    //const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


    let sum = 0;
    let sum1 = 0;
    let sum2 = 0;
    let sum3 = 0;
    let sum4 = 0;
    let sum5 = 0;
    let sum6 = 0;
    let sum7 = 0;
    let sum8 = 0;
    let sum9 = 0;
    let sum10 = 0;
    let sum11 = 0;

    let add = 0;
    let add1 = 0;
    let add2 = 0;
    let add3 = 0;
    let add4 = 0;
    let add5 = 0;
    let add6 = 0;
    let add7 = 0;
    let add8 = 0;
    let add9 = 0;
    let add10 = 0;
    let add11 = 0;

    let total_asset:any;
    let total_lia:any;
    let working_capital:any;
    let equity_ratio:any;
    let debt_ratio:any;
    let debt_ratio1:any;
    let current_ratio: any;
    let current_ratio1: any;

    let inventory1=0;
    let cash=0;
    let receivable=0;
    let other_asset=0;
    let payable=0;
    let other_liability=0;
    let tax=0;

    for(let i=0; i<this.data.length;i++){
      if(this.data[i].type=='Office equipment'){
        if(this.data[i].cost<0){
          inventory1 = inventory1+-1*this.data[i].cost
        }
      }
    }
    for(let i=0; i<this.data.length;i++){
      if(this.data[i].type=='Small inventory'){
        if(this.data[i].cost<0){
          inventory1 = inventory1+-1*this.data[i].cost
        }
      }
    }
    for(let i=0; i<this.data.length;i++){
      if(this.data[i].type=='Deprecation inventory'){
        if(this.data[i].cost>0){
          inventory1 = inventory1-this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++){
      if(this.data[i].payed== false){
        if(this.data[i].cost>0){
          receivable = receivable+this.data[i].cost
        }
      }
    }
    for(let i=0; i<this.data.length;i++){
      if(this.data[i].type== 'Other Assets'){
        if(this.data[i].cost>0){
          other_asset = other_asset+this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++){
      if(this.data[i].payed== false){
        if(this.data[i].cost<0){
          payable = payable+-1*this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++){
      if(!this.data[i].vat_payed){
        if(this.data[i].cost<0){
          other_liability = other_liability+-1*this.data[i].cost
        }
      }
    }
    for(let i=0; i<this.data.length;i++){
      if(!this.data[i].vat_payed){
        if(this.data[i].cost>0){
          tax= tax + this.data[i].VAT*0.01 * this.data[i].cost
        }
      }
    }
    for(let i=0; i<this.data.length;i++){
      if(!this.data[i].vat_payed){
        if(this.data[i].cost<0){
          tax= tax + this.data[i].VAT*0.01 * -1*this.data[i].cost
        }
      }
    }

    total_asset=cash+receivable+inventory1+other_asset
    total_lia=payable+other_liability+tax
    working_capital=Math.round(total_asset-total_lia)
    equity_ratio=(working_capital/(total_asset))*100
    debt_ratio=total_lia/working_capital
    debt_ratio1=Math.round(debt_ratio*100)
    current_ratio=total_asset/total_lia
    current_ratio1=Math.round(current_ratio*100)

    this.Balance.push(
      { name: 'TOTAL ASSETS', euro: total_asset},
      { name: 'Accounts Receivable', euro: receivable},
      { name: 'Inventory', euro: inventory1},
      { name: 'Other Assets', euro: other_asset},
      { name: 'TOTAL LIABILITIES', euro: total_lia},
      { name: 'Accounts Payable', euro: payable},
      { name: 'Tax to pay', euro: Math.round(tax)},
      { name: 'Other Liabilities', euro: other_liability},
    );
    console.log(this.Balance)
    this.cards.push({
      'working':working_capital,
      'equity_ratio':equity_ratio,
      'debt_ratio':debt_ratio.toFixed(2),
      'debt':debt_ratio1,
      'current_ratio':current_ratio.toFixed(2),
      'current':current_ratio1
    })
    console.log(this.cards[0].debt_ratio)


    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 0) {
        if (this.data[i].cost > 0) {
          sum = sum + this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 1) {
        if (this.data[i].cost > 0) {
          sum1 = sum1 + this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 2) {
        if (this.data[i].cost > 0) {
          sum2 = sum2 + this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 3) {
        if (this.data[i].cost > 0) {
          sum3 = sum3 + this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 4) {
        if (this.data[i].cost > 0) {
          sum4 = sum4 + this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 5) {
        if (this.data[i].cost > 0) {
          sum5 = sum5 + this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 6) {
        if (this.data[i].cost > 0) {
          sum6 = sum6 + this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 7) {
        if (this.data[i].cost > 0) {
          sum7 = sum7 + this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 8) {
        if (this.data[i].cost > 0) {
          sum8 = sum8 + this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 9) {
        if (this.data[i].cost > 0) {
          sum9 = sum9 + this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 10) {
        if (this.data[i].cost > 0) {
          sum10 = sum10 + this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 11) {
        if (this.data[i].cost > 0) {
          sum11 = sum11 + this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 0) {
        if (this.data[i].cost < 0) {
          add = add + -1*this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 1) {
        if (this.data[i].cost < 0) {
          add1 = add1 + -1*this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 2) {
        if (this.data[i].cost < 0) {
          add2 = add2 + -1*this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 3) {
        if (this.data[i].cost < 0) {
          add3 = add3 + -1*this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 4) {
        if (this.data[i].cost < 0) {
          add4 = add4 + -1*this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 5) {
        if (this.data[i].cost < 0) {
          add5 = add5 + -1*this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 6) {
        if (this.data[i].cost < 0) {
          add6 = add6 + -1*this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 7) {
        if (this.data[i].cost < 0) {
          add7 = add7 + -1*this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 8) {
        if (this.data[i].cost < 0) {
          add8 = add8 + -1*this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 9) {
        if (this.data[i].cost < 0) {
          add9 = add9 + -1*this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 10) {
        if (this.data[i].cost < 0) {
          add10 = add10 + -1*this.data[i].cost
        }
      }
    }

    for(let i=0; i<this.data.length;i++) {
      if (new Date(this.data[i].date).getMonth() == 11) {
        if (this.data[i].cost < 0) {
          add11 = add11 + -1*this.data[i].cost
        }
      }
    }


    let costs:any = []

    this.data.forEach(row => {
      let found = false;
      costs.forEach((cost:any) => {
        if (cost.type == row.type){
          cost.cost += row.cost
          found = true
          return;
        }
      })
      if (found){
        return;
      }
      costs.push({
        'name': row.type,
        'value': row.cost
      })
    })
    let type_tel=0;
    let type_pen=0;
    let type_stu=0;
    let type_off=0;
    let type_inv=0;
    let type_lit=0;
    let type_tra=0;
    let type_com=0;
    let type_fou=0;
    let type_pro=0;
    let type_rep=0;
    let type_bank=0;
    let type_ins=0;
    let type_oth=0;
    let type_dep=0;

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Telephone costs') {
        if (this.data[i].cost < 0) {
          type_tel = type_tel + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Pension') {
        if (this.data[i].cost < 0) {
          type_pen = type_pen + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Study costs') {
        if (this.data[i].cost < 0) {
          type_stu = type_stu + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Office equipment') {
        if (this.data[i].cost < 0) {
          type_off = type_off + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Small inventory') {
        if (this.data[i].cost < 0) {
          type_inv = type_inv + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Literature') {
        if (this.data[i].cost < 0) {
          type_lit = type_lit + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Travel costs') {
        if (this.data[i].cost < 0) {
          type_tra = type_tra + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Small inventory') {
        if (this.data[i].cost < 0) {
          type_inv = type_inv + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Computer costs') {
        if (this.data[i].cost < 0) {
          type_com = type_com + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Foundation costs') {
        if (this.data[i].cost < 0) {
          type_fou = type_fou + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Promotion/Sponsor costs') {
        if (this.data[i].cost < 0) {
          type_pro = type_pro + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Representation costs') {
        if (this.data[i].cost < 0) {
          type_rep = type_rep + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Bank costs') {
        if (this.data[i].cost < 0) {
          type_bank = type_bank + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Insurance') {
        if (this.data[i].cost < 0) {
          type_ins = type_ins + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Other general costs') {
        if (this.data[i].cost < 0) {
          type_oth = type_oth + 1
        }
      }
    }

    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].type == 'Deprecation inventory') {
        if (this.data[i].cost < 0) {
          type_dep = type_dep + 1
        }
      }
    }


    this.options = {
      title: {
        text: "Income and Expenses"
      },
      color: ["#6D597A","#B56576","#355070"],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      legend: {
        data: ['Income', 'Expenses', 'net profit'],
        top: '90%'
      },
      grid:{
        top:'20%'
      },
      xAxis: [
        {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Income',
          min: 0,
          max: 5000,
          interval: 1000,
          axisLabel: {
            formatter: '{value} €'
          }
        },
        {
          type: 'value',
          name: 'Expenses',
          min: 0,
          max: 5000,
          axisLabel: {
            formatter: '{value} €'
          }
        }
      ],
      series: [
        {
          name: 'Income',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value: number) {
              return value + ' €';
            }
          },
          data: [sum,sum1, sum2, sum3, sum4, sum5,sum6, sum7, sum8,sum9,sum10, sum11]

        },
        {
          name: 'Expenses',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value: number) {
              return value + ' €';
            }
          },
          data: [add,add1, add2, add3, add4, add5,add6, add7, add8,add9,add10, add11]
        },
        {
          name: 'net profit',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value: number) {
              return value + ' €';
            }
          },
          data: [sum-add,sum1-add1,sum2-add2,sum3-add3,sum4-add4,sum5-add5,sum6-add6,sum7-add7,sum8-add8,sum9-add9,sum10-add10,sum11-add11]
        }
      ]
    };

    this.option1 = {
      title: {
        text: "Profit Analysis",
      },
      color: ["#6D597A","#B56576","#355070"],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      legend: {
        top: '90%',
        data: ['Income', 'Net profit', 'Net profit margin']
      },
      grid:{
        left:'15%',
        right:'12%',
      },
      xAxis: [
        {
          type: 'category',
          data: ['Q1', 'Q2', 'Q3', 'Q4'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Income',
          min: 0,
          max: 15000,
          interval: 3000,
          axisLabel: {
            formatter: '{value} €'
          }
        },
        {
          type: 'value',
          name: 'Net profit margin',
          min: 0,
          max: 80,
          interval: 16,
          axisLabel: {
            formatter: '{value} %'
          }
        }
      ],
      series: [
        {
          name: 'Income',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value: number) {
              return value + ' €';
            }
          },
          data: [
            (sum+sum1+sum2), (sum3+sum4+sum5), (sum6+sum7+sum8),(sum9+sum10+sum11)
          ]
        },
        {
          name: 'Net profit',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value: number) {
              return value + ' €';
            }
          },
          data: [
            (sum-add+sum1-add1+sum2-add2), (sum3-add3+sum4-add4+sum5-add5), (sum6-add6+sum7-add7+sum8-add8),(sum9-add9+sum10-add10+sum11-add11)
          ]
        },
        {
          name: 'Net profit margin',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value: number) {
              return value + ' %';
            }
          },
          data: [Math.round(((sum-add+sum1-add1+sum2-add2)/(sum+sum1+sum2)*100)),
            Math.round(((sum3-add3+sum4-add4+sum5-add5)/(sum3+sum4+sum5)*100)),
            Math.round(((sum6-add6+sum7-add7+sum8-add8)/(sum6+sum7+sum8)*100)),
            Math.round(((sum9-add9+sum10-add10+sum11-add11)/(sum9+sum10+sum11)*100))]
        }
      ]
    };

    this.option2 = {
      title: {
        text: "Expenditure Type Ratio"
      },
      color: ["#6D597A","#B56576","#355070","#E56B6F","#EAAC8B",
        "#D8E0BB","#B6CEC7","#86A3C3","#7268A6","#6B3074",
      "#DC8665","#138086","#534666","#CD7672","#EEB462"],
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Type of Cost',
          ratio: '50%',
          type: 'pie',
          data: costs,
          height: '80%',
          top:'15%',
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            show: true
          },
        },
      ],
    };



  }

}



/**
 * @title Basic use of `<table mat-table>`
 */

