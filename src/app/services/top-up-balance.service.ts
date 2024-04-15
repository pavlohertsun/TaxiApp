import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TopUpBalanceService {

  constructor(private http: HttpClient) { }

  topUpBalance(message: Object):Observable<any>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post<any>('http://localhost:8080/api/customer/balance', message, {headers});
  }
}
