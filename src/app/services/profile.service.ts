import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICustomer} from "../models/customer";
import {ICustomerTrip} from "../models/customer-trip";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  getProfile(id: number): Observable<ICustomer> {
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<ICustomer>("http://localhost:8080/api/customer/" + id, { headers: headers });
  }
  getTrips(id: number): Observable<ICustomerTrip[]> {
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<ICustomerTrip[]>("http://localhost:8080/api/customer/" + id + '/trips', { headers: headers });
  }
  getBalance(id: number): Observable<number> {
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<number>("http://localhost:8080/api/customer/" + id + '/balance', { headers: headers });
  }
  getInfoInJson(id: number): Observable<Blob> {
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get("http://localhost:8080/api/customer/downloadUserData/" + id, {
      headers: headers,
      responseType: 'blob'
    });
  }

}
