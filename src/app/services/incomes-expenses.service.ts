import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IIncome} from "../models/income";
import {IExpense} from "../models/expense";

@Injectable({
  providedIn: 'root'
})
export class IncomesExpensesService {

  constructor(private http: HttpClient) { }

  getAllIncomesInMonth(month: number):Observable<IIncome[]>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<IIncome[]>('http://localhost:8080/api/incomes/' + month,  {headers: headers})
  }
  getAllExpensesInMonth(month: number): Observable<IExpense[]>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<IExpense[]>('http://localhost:8080/api/expenses/' + month,  {headers: headers})
  }
  getSumOfIncomes(month: number): Observable<number>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<number>('http://localhost:8080/api/incomes/sum/' + month,  {headers: headers})
  }
  getSumOfExpenses(month: number): Observable<number>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<number>('http://localhost:8080/api/expenses/sum/' + month,  {headers: headers})
  }
}
