import {ITrip} from "./trip";
import {IDriverProfileTrip} from "./driver-profile-trip";

export interface IDriver{
  id: number,
  name: string,
  surname: string,
  email: string,
  phoneNumber: string,
  balance: number,
  license: boolean,
  status: string,
  trips: IDriverProfileTrip[]
}
