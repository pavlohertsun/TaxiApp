import {Component, OnInit} from '@angular/core';
import {
  GoogleMap,
  MapAdvancedMarker,
  MapDirectionsRenderer,
  MapDirectionsService,
  MapMarker,
  MapPolyline
} from "@angular/google-maps";
import {map, Observable, take} from "rxjs";
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PlacesService} from "../../services/places.service";
import {ConvertToAddressService} from "../../services/convert-to-address.service";
import {IAddress} from "../../models/address";
import {AddressContainerComponent} from "../../components/address-container/address-container.component";
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {PricingService} from "../../services/pricing.service";
import {GeolocationService} from "../../services/geolocation.service";
import {WebsocketService} from "../../services/websocket.service";
import {Router} from "@angular/router";
import {NotEnoughBalanceDirective} from "../../directives/not-enough-balance.directive";
import {SettingsService} from "../../services/settings.service";
import {ISettings} from "../../models/settings";
import {TripInfoService} from "../../services/trip-info.service";
import {DriverProfileService} from "../../services/driver-profile.service";
import {IDriverRating} from "../../models/driver-rating";

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    GoogleMap,
    MapMarker,
    MapAdvancedMarker,
    MapPolyline,
    MapDirectionsRenderer,
    AsyncPipe,
    FormsModule,
    AddressContainerComponent,
    NgForOf,
    NgIf,
    NavbarComponent,
    CurrencyPipe,
    NotEnoughBalanceDirective,
  ],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})
export class MapPageComponent implements OnInit{
  center!: google.maps.LatLngLiteral;
  zoom = 11;

  startLatitude!: number;
  startLongitude!: number;

  addresses!: IAddress[];

  destinationAddress: string = '';
  destinationLatitude!: number;
  destinationLongitude!: number;

  price: number = 0;
  startAddress: string = '';

  searchingForDriver = false;
  foundDriver = false;
  enoughBalance !: boolean;

  driver!: {
    id: number,
    name: string,
    surname: string,
    licensePlate: string,
    arrived: boolean,
    ended: boolean
  };

  tripId!: number;
  balance!: number;

  rate!: string;

  driverRating!: IDriverRating;
  constructor(private mapDirectionsService: MapDirectionsService, private placesService: PlacesService,
              private converterService: ConvertToAddressService, private pricingService: PricingService,
              private geolocationService: GeolocationService, private websocketService: WebsocketService,
              private router: Router, private settingsService: SettingsService, private tripService: TripInfoService,
              private driverProfileService: DriverProfileService,) { }

  ngOnInit(): void {
    this.searchingForDriver = true;
    this.foundDriver = true;
    this.driver = {
      id: 1,
      name: 'OLo',
      surname: 'tralik',
      licensePlate: 'valik',
      arrived: true,
      ended: false,
    };
    this.geolocationService.getCurrentPosition()
      .then(coords => {
        this.center = {lat: coords.latitude, lng: coords.longitude};
        this.startLatitude = coords.latitude;
        this.startLongitude = coords.longitude;
      })
      .catch(error => {
        console.error(error)
        this.startLatitude = 49.8326598;
        this.startLongitude = 23.9298358;
        this.center = {lat: this.startLatitude, lng: this.startLongitude};
      });

    this.settingsService.getCurrentSettings()
      .pipe(take(1))
      .subscribe({
        next: (response: ISettings) => {
          this.rate = response.rate;
          console.log(this.rate)
        },
        error: (error: any) => {
          console.error('Cannot find a profile', error);

        },
        complete: () => {
        }
      });

    // @ts-ignore
    this.balance = parseFloat(localStorage.getItem('balance'));
  }

  search(): void {
    if (this.destinationAddress.trim() !== '') {
      console.log(this.destinationAddress);
      this.searchPlace(this.destinationAddress + ' Львівська область');
    }
    this.getAddressFromCoords();
  }
  searchPlace(name: string): void {
    this.placesService.findPlace(name)
      .then(results => {
        this.addresses = this.converterService.convertPlaceResultToAddress(results);
      })
      .catch(error => {
        console.error('Error during search:', error);
      });
  }

  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;

  getDirection() {
    setTimeout(() => {
      const request: google.maps.DirectionsRequest = {
        destination: {lat: this.destinationLatitude, lng: this.destinationLongitude},
        origin: {lat: this.startLatitude, lng: this.startLongitude},
        travelMode: google.maps.TravelMode.DRIVING
      };
      this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));
    }, 1000);
  }
  handleIdClicked(id: number) {
    this.destinationLatitude = this.addresses[id - 1].lat;
    this.destinationLongitude = this.addresses[id - 1].lng;
    this.destinationAddress = this.addresses[id - 1].name;
    this.getDirection();
    this.pricingService.getPrice({
      startAddress: { lat: this.startLatitude, lng: this.startLongitude},
      endAddress: {lat: this.destinationLatitude, lng: this.destinationLongitude},
      rate: this.rate
    }).pipe(take(1)).subscribe({
      next:(response: any) =>{
        this.price = response.price;
      },
      error: (error: any) => {
        console.error('Calculating price failed:', error);
      },
      complete: () => {
      }
    });
  }
  getAddressFromCoords(){
    const latlng = new google.maps.LatLng(this.startLatitude, this.startLongitude);

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': latlng }, (results, status) => {
      if (status === 'OK') {
        // @ts-ignore
        if (results[0]) {
          // @ts-ignore
          const parts = results[0].formatted_address.split(', ');
          this.startAddress = parts.slice(0, 2).join(', ');
        } else {
          console.error('Адресу не знайдено');
        }
      } else {
        console.error('Помилка геокодування: ' + status);
      }
    });
  }
  orderTaxi(){
    if(this.checkIfEnoughBalanceToOrder()) {
      this.websocketService.createTrip({
        startPoint: this.startAddress,
        endPoint: this.destinationAddress,
        price: this.price,
        status: 'Created',
        rate: this.rate,
        description: ' - ',
        customerId: localStorage.getItem('userId')
      });
      this.getTripId();

      this.websocketService.subscribeForCancelling((response) => {
        this.searchingForDriver = false;
        this.foundDriver = false;
        this.websocketService.disconnect();
        location.reload();
      })

      this.searchingForDriver = true;
      // @ts-ignore
      this.websocketService.subscribeForCustomer(localStorage.getItem('userId'),(response) => {
        const driverJson: any = JSON.parse(response.body);

        console.log(driverJson);

        this.searchingForDriver = true;
        this.foundDriver = true;
        this.driver = driverJson;

        this.getDriverDetails();

        if (this.driver.ended) {
          this.searchingForDriver = false;
          this.foundDriver = false;
          this.websocketService.disconnect();
          localStorage.setItem('tripId', JSON.stringify(this.tripId))
          this.router.navigate(['/response']).then(r => ['/']);
        }
      });
    }
  }
  getTripId(){
    this.websocketService.subscribeForDriver((response) => {
      const tripJson: any = JSON.parse(response.body);

      this.tripId = tripJson.id;
    });
  }
  cancelOrder(){
    this.websocketService.cancelTrip(this.tripId);
    this.searchingForDriver = false;
    this.foundDriver = false;
    this.websocketService.disconnect();
    location.reload();
  }
  checkIfEnoughBalanceToOrder() : boolean{
    if(this.balance >= this.price){
      this.enoughBalance = false;
      return true;
    }

    this.enoughBalance = true;
    return false;
  }
  getDriverDetails(){
    this.driverProfileService.getDriverRating(this.driver.id)
      .pipe(take(1))
      .subscribe({
        next: (response: IDriverRating) => {
          this.driverRating = response;
          console.log(this.driverRating);
        },
        error: (error: any) => {
          console.error('Cannot find a rating', error);
        },
        complete: () => {
        }
      });
  }
  showDriverDetails = false;
  mousePosition = { x: 0, y: 0 };
  onMouseMove(event: MouseEvent) {
    this.mousePosition.x = event.clientX;
    this.mousePosition.y = event.clientY;
  }
}
