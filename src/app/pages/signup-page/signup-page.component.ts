import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {RegisterService} from "../../services/register.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {take} from "rxjs";
import {IAuthResponseDto} from "../../dtos/auth-response";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  driver: boolean = false;

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ]),
    surname: new FormControl<string>('', [
      Validators.required
    ]),
    email: new FormControl<string>('', [
      Validators.required
    ]),
    phone: new FormControl<string>('', [
      Validators.required
    ]),
    password: new FormControl<string>('', [
      Validators.required
    ])
  })

  constructor(private regService: RegisterService, private router: Router) {
  }

  regAsADriver() {
    this.driver = !this.driver;
  }

  sighUp() {
    if (this.driver) {
      this.regService.register({
        // @ts-ignore
        name: this.form.value.name,
        // @ts-ignore
        surname: this.form.value.surname,
        // @ts-ignore
        username: this.form.value.email,
        // @ts-ignore
        phoneNumber: this.form.value.phone,
        // @ts-ignore
        password: this.form.value.password,
        role: 'Driver'
      })
        .pipe(take(1))
        .subscribe({
          next: (response: IAuthResponseDto) => {
            this.router.navigate(['/login']).then(r => ['/']);
          },
          error: (error: any) => {
            this.router.navigate(['/login']).then(r => ['/']);
          },
          complete: () => {
          }
        });
    } else {
      this.regService.register({
        // @ts-ignore
        name: this.form.value.name,
        // @ts-ignore
        surname: this.form.value.surname,
        // @ts-ignore
        username: this.form.value.email,
        // @ts-ignore
        phoneNumber: this.form.value.phone,
        // @ts-ignore
        password: this.form.value.password,
        role: 'User'
      })
        .pipe(take(1))
        .subscribe({
          next: (response: IAuthResponseDto) => {
            this.router.navigate(['/login']).then(r => ['/']);
          },
          error: (error: any) => {
            this.router.navigate(['/login']).then(r => ['/']);
          },
          complete: () => {
          }
        });
    }
  }
}
