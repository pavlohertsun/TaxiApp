import {Component, OnInit} from '@angular/core';
import {NgIf, NgFor, NgClass, CurrencyPipe} from "@angular/common";
import {ProfileService} from "../../services/profile.service";
import {take} from "rxjs";
import {ICustomer} from "../../models/customer";
import {TripComponent} from "../../components/trip/trip.component";
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {Router} from "@angular/router";
import {ITrip} from "../../models/trip";
import {ICustomerTrip} from "../../models/customer-trip";
import {TopUpBalanceService} from "../../services/top-up-balance.service";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    TripComponent,
    NavbarComponent,
    NgClass,
    CurrencyPipe
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
    customer!: ICustomer;
    isCustomer = false;
    constructor(private profileService: ProfileService, private router: Router,
                private topUpService: TopUpBalanceService) {
    }
    ngOnInit(): void {
        // @ts-ignore
      const userIdNumber = parseInt(localStorage.getItem('userId'), 10);
        this.profileService.getProfile(userIdNumber)
          .pipe(take(1))
          .subscribe({
            next: (response: ICustomer) => {
              console.log(response)
              this.customer = response;
              localStorage.setItem('balance', JSON.stringify(this.customer.balance));
              this.customer.trips = [];
              this.isCustomer = true;
            },
            error: (error: any) => {
              console.error('Cannot find a profile', error);
              this.isCustomer = false;
            },
            complete: () => {
            }
          });
        this.profileService.getTrips(userIdNumber)
          .pipe(take(1))
          .subscribe({
            next: (response: ICustomerTrip[]) => {
              this.customer.trips = response;
              console.log(this.customer.trips);
            },
            error: (error: any) => {
              console.error('Cannot find a profile', error);
              this.isCustomer = false;
            },
            complete: () => {
            }
          });
    }
  activeButton: string = 'info';

  setActiveButton(button: string): void {
    this.activeButton = button;
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['/']).then(r => ['/']);
  }
  topUpBalance(){
    this.topUpService.topUpBalance( {userId: this.customer.id, sum: 100} )
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          location.reload();
        },
        error: (error: any) => {
          console.error('Cannot find a profile', error);
        },
        complete: () => {
        }
      });
  }

}
