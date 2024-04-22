import { Component } from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {take} from "rxjs";
import {ResponseService} from "../../services/response.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-response-page',
  standalone: true,
  imports: [
    NavbarComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './response-page.component.html',
  styleUrl: './response-page.component.css'
})
export class ResponsePageComponent {
  form = new FormGroup({
    comment: new FormControl<string>('', [
      Validators.required
    ]),
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
      cRate: this.form.value.rate,
      // @ts-ignore
      comment: this.form.value.comment

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
