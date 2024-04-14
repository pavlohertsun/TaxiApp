import {ICustomer} from "./customer";
import {IDriver} from "./driver";

export interface ITrip{
  id: number,
  startTime: string,
  endTime: string,
  startPoint: string,
  endPoint: string,
  price: number,
  status: string,
  rate: string
  description: string,
  user:ICustomer,
  driver: IDriver
}
