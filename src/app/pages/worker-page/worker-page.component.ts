import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {Router} from "@angular/router";
import {NgClass, NgFor, NgIf} from "@angular/common";
import {SupportReqRespService} from "../../services/support-req-resp.service";
import {TripComponent} from "../../components/trip/trip.component";
import {ISupportRequest} from "../../models/support-request";
import {take} from "rxjs";
import {ICustomer} from "../../models/customer";
import {
  SupportRequestContainerComponent
} from "../../components/support-request-container/support-request-container.component";
import {IDriverToAuthenticate} from "../../models/driver-to-authenticate";
import {
  AuthenticateDriverContainerComponent
} from "../../components/authenticate-driver-container/authenticate-driver-container.component";
import {AuthenticateDriverService} from "../../services/authenticate-driver.service";

@Component({
  selector: 'app-worker-page',
  standalone: true,
  imports: [
    NavbarComponent,
    NgClass,
    NgIf,
    NgFor,
    TripComponent,
    SupportRequestContainerComponent,
    AuthenticateDriverContainerComponent
  ],
  templateUrl: './worker-page.component.html',
  styleUrl: './worker-page.component.css'
})
export class WorkerPageComponent implements OnInit{
  activeButton: string = 'drivers';
  requests!: ISupportRequest[];
  drivers!: IDriverToAuthenticate[];
  constructor(private router: Router, private supportService: SupportReqRespService,
              private authenticateService: AuthenticateDriverService) {
  }

  ngOnInit(): void {
    this.getAllProcessingRequests();
    this.getAllDrivers();
  }
  setActiveButton(button: string): void {
    this.activeButton = button;
  }
  getAllProcessingRequests(){
    this.supportService.getAllProcessingRequests()
      .pipe(take(1))
      .subscribe({
        next: (response: ISupportRequest[]) => {
          console.log(response)
          this.requests = response;
        },
        error: (error: any) => {
          console.log(error)
        },
        complete: () => {
        }
      });
  }
  getAllDrivers(){
    this.authenticateService.getAllNonAuthenticatedDrivers()
      .pipe(take(1))
      .subscribe({
        next: (response: IDriverToAuthenticate[]) => {
          console.log(response)
          this.drivers = response;
        },
        error: (error: any) => {
          console.log(error)
        },
        complete: () => {
        }
      });
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['/']).then(r => ['/']);
  }
}
