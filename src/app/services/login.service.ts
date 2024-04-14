import { Injectable } from '@angular/core';
import {ILoginDto} from "../dtos/login";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpStatusCode} from "@angular/common/http";
import {IAuthResponseDto} from "../dtos/auth-response";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(loginDto: ILoginDto): Observable<IAuthResponseDto>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<IAuthResponseDto>('http://localhost:8080/api/auth/login', loginDto, {headers});
  }
}
