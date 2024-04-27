import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {StatisticComponent} from "../../components/statistic/statistic.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IIncome} from "../../models/income";
import {IExpense} from "../../models/expense";
import {TripComponent} from "../../components/trip/trip.component";
import {IncomeContainerComponent} from "../../components/income-container/income-container.component";
import {ExpenseContainerComponent} from "../../components/expense-container/expense-container.component";
import {IncomesExpensesService} from "../../services/incomes-expenses.service";
import {take} from "rxjs";
import {SettingsService} from "../../services/settings.service";
import {ISettings} from "../../models/settings";
import {ILog} from "../../models/log";
import {LogContainerComponent} from "../../components/log-container/log-container.component";
import {IExpenseRequest} from "../../dtos/expense-request";

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
    ExpenseContainerComponent,
    FormsModule,
    LogContainerComponent,
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit {
  activeButton: string = 'stat';

  selectedDateStatistic: string = '';
  selectedDateTransactions: string = '';
  selectedDateLogs: string = '';

  form = new FormGroup({
    percent: new FormControl<number>(0, [
      Validators.required
    ]),
    rate: new FormControl<string>('Low')
  });

  incomes!: IIncome[];
  expenses!: IExpense[];
  logs!: ILog[];

  incomesSum!: number;
  expensesSum!: number;

  expenseSum!: number;
  expenseType!: string;
  expenseDescription!: string;

  expenseToCreate!: IExpenseRequest;

  constructor(private router: Router, private  incomeExpenseService: IncomesExpensesService,
              private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    let month = (todayDate.getMonth() + 1).toString();
    if (month.length === 1) {
      month = '0' + month;
    }
    let day = todayDate.getDate().toString();
    if (day.length === 1) {
      day = '0' + day;
    }
    this.selectedDateStatistic = `${year}-${month}-${day}`;
    this.selectedDateTransactions = `${year}-${month}-${day}`;
    this.selectedDateLogs = `${year}-${month}-${day}`;
    const date = this.selectedDateStatistic + ' 00:01:00'
    this.incomeExpenseService.getAllIncomesInDay(date)
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

    this.incomeExpenseService.getAllExpensesInDay(date)
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

    this.getAllIncomesExpensesSum(date);

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

    this.incomeExpenseService.getAllLogsInDay(date)
      .pipe(take(1))
      .subscribe({
        next: (response: ILog[]) => {
          console.log(response);
          this.logs = response;
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
    location.reload();
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/']).then(r => ['/']);
  }
  getAllIncomesExpensesSum(date: string){
    const currentMonth = new Date().getMonth() + 1;
    this.incomeExpenseService.getSumOfIncomes(date)
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
    this.incomeExpenseService.getSumOfExpenses(date)
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
  getStatisticByDate(){
    const date = this.selectedDateStatistic + ' 00:01:00'
    this.getAllIncomesExpensesSum(date);
  }
  getTransactionsByDate(){
    const date = this.selectedDateTransactions + ' 00:01:00'
    this.incomeExpenseService.getAllIncomesInDay(date)
      .pipe(take(1))
      .subscribe({
        next: (response: IIncome[]) => {
          console.log(response);
          this.incomes = response;
        },
        error: (error: any) => {
          console.error('Cannot find a profile', error);

        },
        complete: () => {
        }
      });

    this.incomeExpenseService.getAllExpensesInDay(date)
      .pipe(take(1))
      .subscribe({
        next: (response: IExpense[]) => {
          console.log(response)
          this.expenses = response;
        },
        error: (error: any) => {
          console.error('Cannot find a profile', error);

        },
        complete: () => {
        }
      });
  }
  getLogsByDate(){
    const date = this.selectedDateLogs + ' 00:01:00'
    this.incomeExpenseService.getAllLogsInDay(date)
      .pipe(take(1))
      .subscribe({
        next: (response: ILog[]) => {
          console.log(response);
          this.logs = response;
        },
        error: (error: any) => {
          console.error('Cannot find a profile', error);

        },
        complete: () => {
        }
      });
  }
  createExpense(){
    if(this.expenseDescription !== '' && this.expenseType !== '' && this.expenseSum !== 0){
      this.expenseToCreate = {
        sum: this.expenseSum,
        type: this.expenseType,
        description: this.expenseDescription
      }
    }
    this.incomeExpenseService.createExpense(this.expenseToCreate)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          console.log('Successfully created')
        },
        error: (error: any) => {
          console.error('Cannot create', error);

        },
        complete: () => {
        }
      });
    location.reload();
  }
}
