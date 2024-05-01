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
import {ICar} from "../../models/car";
import {id} from "@swimlane/ngx-charts";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-driver-profile-page',
  standalone: true,
  imports: [
    NavbarComponent,
    CurrencyPipe,
    NgForOf,
    NgIf,
    TripComponent,
    NgClass,
    FormsModule
  ],
  templateUrl: './driver-profile-page.component.html',
  styleUrl: './driver-profile-page.component.css'
})
export class DriverProfilePageComponent implements OnInit {
  driver!: IDriver;

  car!: ICar;
  carIsRegistered!: boolean;
  licensePlate: string = '';

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
          this.isDriver = true;
          localStorage.setItem('driverStatus', this.driver.status);
          if (this.driver.status === 'Authenticated' && this.driver.license) {
            this.licenseText = 'Authenticated';
          } else if (this.driver.status === 'Non-authenticated' && this.driver.license) {
            this.licenseText = 'Non-authenticated (We will check your documents soon)';
          } else if (!this.driver.license) {
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
    this.driverProfileService.checkIfDriverHasCar(userIdNumber)
      .pipe(take(1))
      .subscribe({
        next: (response: boolean) => {
          this.carIsRegistered = response;
        },
        error: (error: any) => {
          console.error('Cannot find trips', error);
        },
        complete: () => {
        }
      });
  }

  activeButton: string = 'info';

  setActiveButton(button: string): void {
    this.activeButton = button;
  }

  authenticateMe() {
    if (this.carIsRegistered) {
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
  }

  downloadFile() {
    // @ts-ignore
    const userIdNumber = parseInt(localStorage.getItem('userId'), 10);
    this.driverProfileService.getInfoInJson(userIdNumber).subscribe(response => {
      this.saveFile(response);
    });
  }

  private saveFile(response: Blob): void {
    const blob = new Blob([response], {type: 'application/json'});
    const url = window.URL.createObjectURL(blob);

    const file = new File([blob], 'driverData.json', {type: 'application/json'});

    const a = document.createElement('a');
    a.href = url;
    a.download = 'driverData.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  registerCar() {
    // @ts-ignore
    const userIdNumber = parseInt(localStorage.getItem('userId'), 10);
    this.driverProfileService.registerCar({id: userIdNumber, licensePlate: this.licensePlate, document: false})
      .pipe(take(1))
      .subscribe({
        next: (response: boolean) => {
          this.carIsRegistered = response;
        },
        error: (error: any) => {
          console.error('Cannot find trips', error);
        },
        complete: () => {
        }
      });
    location.reload()
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/']).then(r => ['/']);
  }
}
