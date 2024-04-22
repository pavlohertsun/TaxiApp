import {Component, Input} from '@angular/core';
import {IExpense} from "../../models/expense";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-expense-container',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './expense-container.component.html',
  styleUrl: './expense-container.component.css'
})
export class ExpenseContainerComponent {
  @Input() expense!: IExpense;
}
