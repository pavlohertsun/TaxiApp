import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICustomer} from "../models/customer";
import {ICustomerTrip} from "../models/customer-trip";
import {IDriver} from "../models/driver";
import {IDriverProfileTrip} from "../models/driver-profile-trip";
import {IDriverRating} from "../models/driver-rating";

@Injectable({
  providedIn: 'root'
})
export class DriverProfileService {

  constructor(private http: HttpClient) { }

  getDriverProfile(id: number): Observable<IDriver> {
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<IDriver>("http://localhost:8080/api/driver/" + id, { headers: headers });
  }
  getDriverTrips(id: number): Observable<IDriverProfileTrip[]> {
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<IDriverProfileTrip[]>("http://localhost:8080/api/driver/" + id + '/trips', { headers: headers });
  }
  getDriverRating(id: number): Observable<IDriverRating>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<IDriverRating>("http://localhost:8080/api/driver/" + id + '/rating', { headers: headers });
  }
}
