import {Component, OnInit, SimpleChanges} from '@angular/core';
import {CoordinatesService} from "../../services/coordinates.service";
import {
  GoogleMap,
  MapAdvancedMarker,
  MapDirectionsRenderer,
  MapDirectionsService,
  MapMarker,
  MapPolyline
} from "@angular/google-maps";
import {map, Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DestinationService} from "../../services/destination.service";
import {PlacesService} from "../../services/places.service";

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
  ],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})
export class MapPageComponent {
  address: string = '';
  startLatitude!: number;
  startLongitude!: number;
  destinationLatitude!: number;
  destinationLongitude!: number;
  center: google.maps.LatLngLiteral = {lat: 49.8326598, lng: 23.9298358};
  zoom = 10;
  constructor(private coordinatesService: CoordinatesService, private destinationService: DestinationService,
              private mapDirectionsService: MapDirectionsService, private placesService: PlacesService) { }

  ngOnInit(): void {
    this.updateCenter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateCenter();
  }

  private updateCenter(): void {
    this.startLatitude = this.coordinatesService.getLatitude();
    this.startLongitude = this.coordinatesService.getLongitude();
    this.center = {lat: this.startLatitude, lng: this.startLongitude};
  }
  search(): void {
    if (this.address.trim() !== '') {
      console.log(this.address);
      this.destinationService.getCoordinates(this.address + " Львів").subscribe(
        coordinates => {
          this.destinationLatitude = coordinates.lat;
          this.destinationLongitude = coordinates.lng;

          //this.getDirection();
          this.searchPlace(this.address + " Львів")
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
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
  searchPlace(name: string): void {
    this.placesService.findPlace(name)
      .then(results => {
        // console.log('Search results:', results);
        // // Тут ви можете обробити результати пошуку
        if (results.length > 0) {
          const firstResult = results[0];
          // @ts-ignore
          this.destinationLatitude = firstResult.geometry.location.lat();
          // @ts-ignore
          this.destinationLongitude = firstResult.geometry.location.lng();
          console.log('Latitude:',  this.destinationLatitude);
          console.log('Longitude:', this.destinationLongitude);

          this.getDirection();
        } else {
          console.log('No results found');
        }
      })
      .catch(error => {
        console.error('Error during search:', error);
      });
  }
}
