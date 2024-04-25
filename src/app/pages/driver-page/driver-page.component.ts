import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {WebsocketService} from "../../services/websocket.service";
import {ITrip} from "../../models/trip";
import {TripComponent} from "../../components/trip/trip.component";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {AvailableOrderComponent} from "../../components/available-order/available-order.component";
import {TripInfoService} from "../../services/trip-info.service";
import {take} from "rxjs";
import {ICustomerTrip} from "../../models/customer-trip";
import {IDriverTrip} from "../../models/driver-trip";
import {Router} from "@angular/router";
import {GetAllInProgressTripsService} from "../../services/get-all-in-progress-trips.service";

@Component({
  selector: 'app-driver-page',
  standalone: true,
  imports: [
    TripComponent,
    NgIf,
    NavbarComponent,
    NgClass,
    AvailableOrderComponent,
    NgForOf
  ],
  templateUrl: './driver-page.component.html',
  styleUrl: './driver-page.component.css'
})
export class DriverPageComponent implements OnInit{
  trip!: ITrip;
  trips: ITrip[] = [];

  appliedTrip!: IDriverTrip;

  driverActive = false;
  tripId!: number;
  foundTrip = false;

  buttonText = 'Arrived';

  driverBanned = false;
  constructor(private websocketService: WebsocketService,
              private tripInfoService: TripInfoService,
              private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.websocketService.connect();
      this.websocketService.subscribeForDriver((response) => {
        const tripJson: any = JSON.parse(response.body);

        this.trip = tripJson;
        this.trips.push(tripJson);
        console.log("trips" + this.trips);
      });
      this.websocketService.subscribeForCancelling((response) => {
            this.websocketService.disconnect();
            location.reload();
      });
    } catch (error) {
      console.error("Error connecting to WebSocket", error);
    }
  }


  activate(){
    if(localStorage.getItem('driverStatus') === 'Authenticated'){
      this.driverActive = !this.driverActive;
    }
    else {
      this.driverBanned = true;
    }
  }
  takeOrder(){
    // @ts-ignore
    const userIdNumber = parseInt(localStorage.getItem('userId'), 10);
    console.log(userIdNumber);
    this.websocketService.applyTrip({
      id: this.tripId,
      startTime: this.trip.startTime,
      startPoint: this.trip.startPoint,
      endPoint: this.trip.endPoint,
      price: this.trip.price,
      status: 'In progress',
      rate: this.trip.rate,
      description: this.trip.description,
      customerId: this.trip.user.id,
      driverId: userIdNumber
    }, this.trip.user.id);
    this.getInfoAboutTrip();
  }
  getInfoAboutTrip(){
    this.tripInfoService.getTripInfoForDriver(this.tripId)
      .pipe(take(1))
      .subscribe({
        next: (response: IDriverTrip) => {
          this.appliedTrip = response;
          console.log(response);
        },
        error: (error: any) => {
          console.error('Cannot find a profile', error);

        },
        complete: () => {
        }
      });
  }
  handleIdClicked(id: number) {
    this.tripId = id;
    this.takeOrder();
    this.foundTrip = true;
  }

  driverArrived(){
    // @ts-ignore
    const userIdNumber = parseInt(localStorage.getItem('userId'), 10);
    if(this.buttonText == 'Arrived'){
      this.websocketService.driverArrived(userIdNumber, this.trip.user.id);
      this.buttonText = 'End trip';
    }
    else{
      this.websocketService.endTrip(userIdNumber, this.trip.user.id);

      this.tripInfoService.endTrip({
        id: this.tripId,
        startTime: this.trip.startTime,
        startPoint: this.trip.startPoint,
        endPoint: this.trip.endPoint,
        price: this.trip.price,
        status: 'Completed',
        rate: this.trip.rate,
        description: this.trip.description,
        customerId: this.trip.user.id,
        driverId: userIdNumber
       }).pipe(take(1))
      .subscribe({
        next: (response: any) => {
          console.log('ending response:' + response);
        },
        error: (error: any) => {
          console.error( error);
        },
        complete: () => {
        }
      });

      this.websocketService.disconnect();

      this.buttonText = 'Arrived';
      this.foundTrip = false;
      localStorage.setItem('tripId', JSON.stringify(this.tripId))
      this.router.navigate(['/dresponse']).then(r => ['/']);
    }

  }
  cancelTrip(){
    this.websocketService.cancelTrip(this.tripId);
    this.driverActive = false;
    this.foundTrip = false;
    this.buttonText = 'Arrived';
    this.websocketService.disconnect();
    location.reload();
  }
}
