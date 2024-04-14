import {ITrip} from "./trip";

export interface ICustomer {
  id: number,
  name: string,
  surname: string,
  email: string,
  phoneNumber: string,
  rating: number,
  trips: Set<ITrip>
}