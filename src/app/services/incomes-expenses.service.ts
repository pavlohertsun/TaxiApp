import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IIncome} from "../models/income";
import {IExpense} from "../models/expense";
import {ILog} from "../models/log";
import {IExpenseRequest} from "../dtos/expense-request";

@Injectable({
  providedIn: 'root'
})
export class IncomesExpensesService {

  constructor(private http: HttpClient) { }

  getAllIncomesInDay(date: string):Observable<IIncome[]>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<IIncome[]>('http://localhost:8080/api/incomes/' + date,  {headers: headers})
  }
  getAllExpensesInDay(date: string): Observable<IExpense[]>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<IExpense[]>('http://localhost:8080/api/expenses/' + date,  {headers: headers})
  }
  getSumOfIncomes(date: string): Observable<number>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<number>('http://localhost:8080/api/incomes/sum/' + date,  {headers: headers})
  }
  getSumOfExpenses(date: string): Observable<number>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<number>('http://localhost:8080/api/expenses/sum/' + date,  {headers: headers})
  }
  getAllLogsInDay(date: string):Observable<ILog[]>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<ILog[]>('http://localhost:8080/api/logs/' + date,  {headers: headers})
  }
  createExpense(request: IExpenseRequest):Observable<any>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post<any>('http://localhost:8080/api/expenses', request,  {headers: headers})
  }
}
