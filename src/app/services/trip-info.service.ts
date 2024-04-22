import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IDriverTrip} from "../models/driver-trip";
import {ITrip} from "../models/trip";

@Injectable({
  providedIn: 'root'
})
export class TripInfoService {

  constructor(private http: HttpClient) { }
  getTripInfoForDriver(id: number):Observable<IDriverTrip>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<IDriverTrip>('http://localhost:8080/api/trip/getInfo/' + id, {headers});
  }
  endTrip(message: any):Observable<any>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post<any>('http://localhost:8080/api/trip/end', message,  {headers});
  }
  cancelTrip(message: number){
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<any>('http://localhost:8080/api/trip/cancel/' + message,  {headers});
  }
}
