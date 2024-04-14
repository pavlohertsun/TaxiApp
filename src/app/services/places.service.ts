import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor() { }
  findPlace(name: string): Promise<google.maps.places.PlaceResult[]> {
    return new Promise((resolve, reject) => {
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      service.textSearch({ query: name }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if(results)
          resolve(results);
          else {
            reject("No results found");
          }
        } else {
          reject(status);
        }
      });
    });
  }
}
