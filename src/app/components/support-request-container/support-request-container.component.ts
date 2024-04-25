import {Component, Input} from '@angular/core';
import {ISupportRequest} from "../../models/support-request";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SupportReqRespService} from "../../services/support-req-resp.service";
import {take} from "rxjs";

@Component({
  selector: 'app-support-request-container',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './support-request-container.component.html',
  styleUrl: './support-request-container.component.css'
})
export class SupportRequestContainerComponent {
  @Input() request!: ISupportRequest;
  form = new FormGroup({
    response: new FormControl<string>('', [
      Validators.required
    ]),
  });

  constructor(private supportService: SupportReqRespService) {

  }

  sendResponse(){
    this.supportService.setResponseToRequest({
      id: this.request.id,
      // @ts-ignore
      response: this.form.value.response,
      status: 'Processed',
    })
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {
          console.log(error)
        },
        complete: () => {
        }
      });
    location.reload();
  }
}
