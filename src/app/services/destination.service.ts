import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  getCoordinates(address: string): Observable<{ lat: number, lng: number }> {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json`;
    const params = { address, key: 'AIzaSyCI1dVonXJS7Vj5zrfng6YihG8IBk4z4oU' }; // Замініть YOUR_API_KEY на ваш ключ API

    return this.http.get<any>(apiUrl, { params }).pipe(
      map(response => {
        const location = response.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      })
    );
  }
}
