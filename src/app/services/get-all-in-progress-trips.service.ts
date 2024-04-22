import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITrip} from "../models/trip";

@Injectable({
  providedIn: 'root'
})
export class GetAllInProgressTripsService {

  constructor(private http: HttpClient) { }

  getAllInProgressTrips():Observable<ITrip[]>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<ITrip[]>('http://localhost:8080/api/trip/getInProgressTrips');
  }
}
