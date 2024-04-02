import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {
  private latitude!: number;
  private longitude!: number;

  setCoordinates(latitude: number, longitude: number): void {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  getLatitude(): number {
    return this.latitude;
  }

  getLongitude(): number {
    return this.longitude;
  }
}
