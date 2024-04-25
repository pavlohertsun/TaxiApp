import {Component, Input} from '@angular/core';
import {IDriverToAuthenticate} from "../../models/driver-to-authenticate";
import {AuthenticateDriverService} from "../../services/authenticate-driver.service";
import {take} from "rxjs";
import {ISupportRequest} from "../../models/support-request";

@Component({
  selector: 'app-authenticate-driver-container',
  standalone: true,
  imports: [],
  templateUrl: './authenticate-driver-container.component.html',
  styleUrl: './authenticate-driver-container.component.css'
})
export class AuthenticateDriverContainerComponent {
  @Input() driver!: IDriverToAuthenticate;
  constructor(private authenticateService: AuthenticateDriverService) {
  }
  authenticate(){
    this.authenticateService.authenticateDriver(this.driver)
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
    location.reload();
  }
}
