import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {StatisticComponent} from "../../components/statistic/statistic.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IIncome} from "../../models/income";
import {IExpense} from "../../models/expense";
import {TripComponent} from "../../components/trip/trip.component";
import {IncomeContainerComponent} from "../../components/income-container/income-container.component";
import {ExpenseContainerComponent} from "../../components/expense-container/expense-container.component";
import {IncomesExpensesService} from "../../services/incomes-expenses.service";
import {take} from "rxjs";
import {IDriverTrip} from "../../models/driver-trip";
import {SettingsService} from "../../services/settings.service";
import {ISettings} from "../../models/settings";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    NavbarComponent,
    NgClass,
    StatisticComponent,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NgForOf,
    TripComponent,
    IncomeContainerComponent,
    ExpenseContainerComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit {
  activeButton: string = 'stat';

  form = new FormGroup({
    percent: new FormControl<number>(0, [
      Validators.required
    ]),
    rate: new FormControl<string>('Low')
  });

  incomes!: IIncome[];
  expenses!: IExpense[];

  incomesSum!: number;
  expensesSum!: number;


  constructor(private router: Router, private  incomeExpenseService: IncomesExpensesService,
              private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    const currentMonth = new Date().getMonth() + 1;
    this.incomeExpenseService.getAllIncomesInMonth(currentMonth)
      .pipe(take(1))
      .subscribe({
        next: (response: IIncome[]) => {
          this.incomes = response;
        },
        error: (error: any) => {
          console.error('Cannot find a profile', error);

        },
        complete: () => {
        }
      });

    this.incomeExpenseService.getAllExpensesInMonth(currentMonth)
      .pipe(take(1))
      .subscribe({
        next: (response: IExpense[]) => {
          this.expenses = response;
        },
        error: (error: any) => {
          console.error('Cannot find a profile', error);

        },
        complete: () => {
        }
      });

    this.getAllIncomesExpensesSum();

    this.settingsService.getCurrentSettings()
      .pipe(take(1))
      .subscribe({
        next: (response: ISettings) => {
          this.form.patchValue({
            percent: response.percent,
            rate: response.rate
          });
        },
        error: (error: any) => {
          console.error('Cannot find a profile', error);

        },
        complete: () => {
        }
      });
  }

  setActiveButton(button: string): void {
    this.activeButton = button;
  }

  saveSettings() {
    const rate = this.form.value.rate;
    const percent = this.form.value.percent;

    // @ts-ignore
    this.settingsService.saveSettings({rate: rate, percent: percent})
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          console.log(response)
        },
        error: (error: any) => {
          console.error('Cannot find a profile', error);

        },
        complete: () => {
        }
      });
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/']).then(r => ['/']);
  }
  getAllIncomesExpensesSum(){
    const currentMonth = new Date().getMonth() + 1;
    this.incomeExpenseService.getSumOfIncomes(currentMonth)
      .pipe(take(1))
      .subscribe({
        next: (response: number) => {
          this.incomesSum = response;
        },
        error: (error: any) => {
          console.error('Cannot find a profile', error);

        },
        complete: () => {
        }
      });
    this.incomeExpenseService.getSumOfExpenses(currentMonth)
      .pipe(take(1))
      .subscribe({
        next: (response: number) => {
          this.expensesSum = response;
        },
        error: (error: any) => {
          console.error('Cannot find a profile', error);

        },
        complete: () => {
        }
      });
  }
}
