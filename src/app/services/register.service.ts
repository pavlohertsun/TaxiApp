import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ILoginDto} from "../dtos/login";
import {Observable} from "rxjs";
import {IAuthResponseDto} from "../dtos/auth-response";
import {IRegisterDto} from "../dtos/register-dto";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  register(registerDto: IRegisterDto): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>('http://localhost:8080/auth/register', registerDto, {headers});
  }
}
