import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISupportReqDto} from "../dtos/support-req-dto";
import {ISupportRespDto} from "../dtos/support-resp-dto";
import {ISupportRequest} from "../models/support-request";

@Injectable({
  providedIn: 'root'
})
export class SupportReqRespService {

  constructor(private http: HttpClient) { }
  createRequest(request: ISupportReqDto): Observable<any>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.post<any>('http://localhost:8080/api/support', request, {headers});
  }
  setResponseToRequest(response: ISupportRespDto): Observable<any>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.put<any>('http://localhost:8080/api/support', response, {headers});
  }
  getAllProcessingRequests(): Observable<ISupportRequest[]>{
    const token = "Bearer " + localStorage.getItem('accessToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return this.http.get<ISupportRequest[]>('http://localhost:8080/api/support', {headers});
  }
}
