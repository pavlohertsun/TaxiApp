import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {IIncome} from "../../models/income";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-income-container',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './income-container.component.html',
  styleUrl: './income-container.component.css'
})
export class IncomeContainerComponent implements OnChanges{
  @Input() income!: IIncome;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('income')) {

    }
  }
}
