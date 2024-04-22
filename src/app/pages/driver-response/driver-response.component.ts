import { Component } from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ResponseService} from "../../services/response.service";
import {take} from "rxjs";
import {IAuthResponseDto} from "../../dtos/auth-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-response',
  standalone: true,
    imports: [
        NavbarComponent,
        ReactiveFormsModule
    ],
  templateUrl: './driver-response.component.html',
  styleUrl: './driver-response.component.css'
})
export class DriverResponseComponent {
  form = new FormGroup({
    rate: new FormControl<number>(0)
  });

  constructor(private responseService: ResponseService, private router: Router) {
  }
  sendResponse() {
    const tripId = localStorage.getItem('tripId');

    this.responseService.sendReview({
      // @ts-ignore
      id: tripId,
      // @ts-ignore
      dRate: this.form.value.rate
    })
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          console.log(response)
        },
        error: (error: any) => {
          console.log(error)
        },
        complete: () => {
        }
      });
    this.router.navigate(['/']).then(r => ['/']);
  }
}
