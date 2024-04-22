import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IReview} from "../models/review";

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private http: HttpClient) { }
  sendReview(review: IReview): Observable<any>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post<any>('http://localhost:8080/api/reviews', review, {headers});
  }
}
