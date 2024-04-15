import {ICustomerTrip} from "./customer-trip";

export interface ICustomer {
  id: number,
  name: string,
  surname: string,
  email: string,
  phoneNumber: string,
  rating: number,
  trips: ICustomerTrip[]
}
