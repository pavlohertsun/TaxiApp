import { Component } from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {take} from "rxjs";
import {IAuthResponseDto} from "../../dtos/auth-response";
import {SupportReqRespService} from "../../services/support-req-resp.service";
import {ISupportReqDto} from "../../dtos/support-req-dto";

@Component({
  selector: 'app-support-page',
  standalone: true,
  imports: [
    NavbarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './support-page.component.html',
  styleUrl: './support-page.component.css'
})
export class SupportPageComponent {
  form = new FormGroup({
    request: new FormControl<string>('', [
      Validators.required
    ]),
  });
  request!: ISupportReqDto;
  constructor(private supportService: SupportReqRespService) {
  }
  sendRequest(){
    const role = localStorage.getItem('userRole');
    if(role === 'DRIVER'){
      this.request = {
        // @ts-ignore
        request: this.form.value.request,
        customerId: 0,
        // @ts-ignore
        driverId: localStorage.getItem('userId')
      }
    }
    else if(role === 'USER'){
      this.request = {
        // @ts-ignore
        request: this.form.value.request,
        // @ts-ignore
        customerId: localStorage.getItem('userId'),
        driverId: 0
      }
    }
    this.supportService.createRequest(this.request)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {

        },
        error: (error: any) => {

        },
        complete: () => {
        }
      });
    location.reload();
  }
}
