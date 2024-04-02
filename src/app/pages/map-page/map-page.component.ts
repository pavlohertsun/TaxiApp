import {Component, SimpleChanges} from '@angular/core';
import {CoordinatesService} from "../../services/coordinates.service";
import {GoogleMap, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    GoogleMap,
    MapMarker,
  ],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})
export class MapPageComponent {
  latitude!: number;
  longitude!: number;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 15;
  constructor(private coordinatesService: CoordinatesService) { }

  ngOnInit(): void {
    this.updateCenter();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateCenter();
  }

  private updateCenter(): void {
    this.latitude = this.coordinatesService.getLatitude();
    this.longitude = this.coordinatesService.getLongitude();
    this.center = { lat: this.latitude, lng: this.longitude };
  }

}
