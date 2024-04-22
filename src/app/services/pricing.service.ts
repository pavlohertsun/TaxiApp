import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PriceRequest} from "../dtos/price-request";

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private http: HttpClient) { }
  getPrice(priceRequest: PriceRequest): Observable<number>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post<number>('http://localhost:8080/api/trip/calculate', priceRequest, {headers});
  }
}
