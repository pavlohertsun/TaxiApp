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

  driver!: {
    name: string,
    surname: string,
    arrived: boolean,
    ended: boolean
  };

  tripId!: number;
  constructor(private mapDirectionsService: MapDirectionsService, private placesService: PlacesService,
              private converterService: ConvertToAddressService, private pricingService: PricingService,
              private geolocationService: GeolocationService, private websocketService: WebsocketService,
              private router: Router) { }

  ngOnInit(): void {
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
      rate: 'Low'
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
    this.websocketService.createTrip({
      startPoint: this.startAddress,
      endPoint: this.destinationAddress,
      price: this.price,
      status: 'Created',
      rate: 'Low',
      description: ' - ',
      customerId: localStorage.getItem('userId')
    });
    this.getTripId();

    this.websocketService.subscribeForCancelling((response) =>{
      this.searchingForDriver = false;
      this.foundDriver = false;
      this.websocketService.disconnect();
      this.router.navigate(['/']).then(r => ['/']);
    })

    this.searchingForDriver = true;

    this.websocketService.subscribeForCustomer((response) => {
        const driverJson: any = JSON.parse(response.body);

        console.log(driverJson);

        this.searchingForDriver = true;
        this.foundDriver = true;
        this.driver = driverJson;

        if(this.driver.ended){
          this.searchingForDriver = false;
          this.foundDriver = false;
          this.websocketService.disconnect();
          this.router.navigate(['/']).then(r => ['/']);
        }
    });
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
    this.router.navigate(['/']).then(r => ['/']);
  }
}
