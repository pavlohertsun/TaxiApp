import {Component, Input, OnInit} from '@angular/core';
import {BarChartModule} from "@swimlane/ngx-charts";
import {IStatistic} from "../../models/statistic";
import {IncomesExpensesService} from "../../services/incomes-expenses.service";
import {take} from "rxjs";
import {CurrencyPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [
    BarChartModule,
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css'
})
export class StatisticComponent implements OnInit{
 results!: IStatistic[];
 input!: number;

 @Input() incomes!: number;
 @Input() expenses!: number;

 profit!: number;

 constructor(private incomesExpensesService: IncomesExpensesService) {
 }

  ngOnInit(): void {
       this.results = [
         {
           name : 'Incomes',
           value : this.incomes
         },
         {
           name : 'Expenses',
           value : this.expenses
         }
       ];
       this.profit = this.incomes - this.expenses;
    }
}
