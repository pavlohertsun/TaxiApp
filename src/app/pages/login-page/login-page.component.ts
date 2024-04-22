import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {ILoginDto} from "../../dtos/login";
import {take} from "rxjs";
import {HttpStatusCode} from "@angular/common/http";
import {IAuthResponseDto} from "../../dtos/auth-response";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  accessDenied: boolean = false;
  form = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required
    ]),
    password: new FormControl<string>('', [
      Validators.required
    ])
  })
  constructor(private loginService: LoginService, private router: Router) {
  }
  login(){
    const loginDto: ILoginDto = {
      // @ts-ignore
      username: this.form.value.username,
      // @ts-ignore
      password: this.form.value.password
    };
    this.loginService.login(loginDto)
      .pipe(take(1))
      .subscribe({
        next: (response: IAuthResponseDto) => {
          console.log('Login successful:', response);
          localStorage.setItem('accessToken', response.jwtToken.token);
          localStorage.setItem('userId', String(response.userDto.id));
          localStorage.setItem('userRole', String(response.userDto.role));
          if(response.userDto.role === 'USER'){
            this.router.navigate(['/profile']).then(r => ['/']);
          }
          else if(response.userDto.role === 'DRIVER'){
            this.router.navigate(['/dprofile']).then(r => ['/']);
          }
          else if(response.userDto.role === 'ADMIN'){
            this.router.navigate(['/admin']).then(r => ['/']);
          }
          this.accessDenied = false;
        },
        error: (error: any) => {
          console.error('Login failed:', error);
          this.accessDenied = true;
        },
        complete: () => {
        }
      });
  }
}
