import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {TripComponent} from "../../components/trip/trip.component";
import {IDriver} from "../../models/driver";
import {Router} from "@angular/router";
import {DriverProfileService} from "../../services/driver-profile.service";
import {take} from "rxjs";
import {IDriverProfileTrip} from "../../models/driver-profile-trip";
import {IDriverRating} from "../../models/driver-rating";

@Component({
  selector: 'app-driver-profile-page',
  standalone: true,
  imports: [
    NavbarComponent,
    CurrencyPipe,
    NgForOf,
    NgIf,
    TripComponent,
    NgClass
  ],
  templateUrl: './driver-profile-page.component.html',
  styleUrl: './driver-profile-page.component.css'
})
export class DriverProfilePageComponent implements OnInit{
  driver!: IDriver;
  isDriver = false;
  licenseText = 'Non-authenticated';
  driverRating!: IDriverRating;

  constructor(private driverProfileService: DriverProfileService, private router: Router) {
  }
  ngOnInit(): void {
    // @ts-ignore
    const userIdNumber = parseInt(localStorage.getItem('userId'), 10);
    this.driverProfileService.getDriverProfile(userIdNumber)
      .pipe(take(1))
      .subscribe({
        next: (response: IDriver) => {
          this.driver = response;
          this.driver.trips = [];
          this.isDriver = true;
          localStorage.setItem('driverStatus', this.driver.status);
          if(this.driver.status === 'Authenticated' && this.driver.license){
            this.licenseText = 'Authenticated';
          }
          else if(this.driver.status === 'Non-authenticated' && this.driver.license){
            this.licenseText = 'Non-authenticated (We will check your documents soon)';
          }
          else if(!this.driver.license){
            this.licenseText = 'Non-authenticated (Send your documents on our email and we will check it)';
          }
        },
        error: (error: any) => {
          console.error('Cannot find a profile', error);
          this.isDriver = false;
        },
        complete: () => {
        }
      });
    this.driverProfileService.getDriverTrips(userIdNumber)
      .pipe(take(1))
      .subscribe({
        next: (response: IDriverProfileTrip[]) => {
          this.driver.trips = response;
        },
        error: (error: any) => {
          console.error('Cannot find trips', error);
        },
        complete: () => {
        }
      });
    this.driverProfileService.getDriverRating(userIdNumber)
      .pipe(take(1))
      .subscribe({
        next: (response: IDriverRating) => {
          this.driverRating = response;
        },
        error: (error: any) => {
          console.error('Cannot find a rating', error);
        },
        complete: () => {
        }
      });
  }

  activeButton: string = 'info';

  setActiveButton(button: string): void {
    this.activeButton = button;
  }
  authenticateMe(){
    // @ts-ignore
    const userIdNumber = parseInt(localStorage.getItem('userId'), 10);
    this.driverProfileService.authenticateMe(userIdNumber)
      .pipe(take(1))
      .subscribe({
        next: (response: IDriverRating) => {
          this.driverRating = response;
        },
        error: (error: any) => {
          console.error('Cannot find a rating', error);
        },
        complete: () => {
        }
      });
    location.reload();
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['/']).then(r => ['/']);
  }
}
