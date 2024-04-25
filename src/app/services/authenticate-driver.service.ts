import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PriceRequest} from "../dtos/price-request";
import {Observable} from "rxjs";
import {IDriverToAuthenticate} from "../models/driver-to-authenticate";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateDriverService {

  constructor(private http: HttpClient) { }
  getAllNonAuthenticatedDrivers(): Observable<IDriverToAuthenticate[]>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<IDriverToAuthenticate[]>('http://localhost:8080/api/driver/', {headers});
  }
  authenticateDriver(driver: IDriverToAuthenticate):Observable<any>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.put<any>('http://localhost:8080/api/driver/authenticate', driver,{headers});
  }
  setLicenseTrue(id: number): Observable<any>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.put<any>('http://localhost:8080/api/driver/authenticate', id,{headers});
  }
}
