import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }
  getCurrentPosition(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve(position.coords)
            console.log(position)
          },
          error => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Геолокація не підтримується в цьому браузері'));
      }
    });
  }
}
