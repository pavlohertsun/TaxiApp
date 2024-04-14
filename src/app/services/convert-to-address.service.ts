import { Injectable } from '@angular/core';
import {IAddress} from "../models/address";

@Injectable({
  providedIn: 'root'
})
export class ConvertToAddressService {

  constructor() { }
  convertPlaceResultToAddress(apiResult: google.maps.places.PlaceResult[]): IAddress[] {
    let i = 1;
    const addresses: IAddress[] = [];

    apiResult.forEach(result => {
      if (result.geometry && result.geometry.location && result.name && result.formatted_address) {
        const address: IAddress = {
          id: i++,
          name: result.name,
          formatted_address: result.formatted_address,
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng()
        };
        addresses.push(address);
      } else {
        console.error('Геометрія або місцезнаходження відсутні для даного результату:', result);
      }
    });

    return addresses;
  }
}
