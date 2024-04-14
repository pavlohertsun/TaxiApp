import {ICustomer} from "./customer";

export interface ITrip{
  startTime: string,
  endTime: string,
  startPoint: string,
  endPoint: string,
  price: number,
  status: string,
  rate: string
  description: string,
  user:ICustomer;
}
