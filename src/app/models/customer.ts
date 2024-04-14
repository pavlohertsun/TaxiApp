import {ITrip} from "./trip";

export interface ICustomer {
  name: string,
  surname: string,
  email: string,
  phoneNumber: string,
  rating: number,
  trips: ITrip[]
}
