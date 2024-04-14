import {ITrip} from "./trip";

export interface IDriver{
  id: number,
  name: string,
  surname: string,
  email: string,
  phoneNumber: string,
  rating: number,
  trips: ITrip[]
}
