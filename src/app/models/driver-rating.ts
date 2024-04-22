import {IReview} from "./driver-review";

export interface IDriverRating{
  rating: number,
  tripsCount: number,
  reviews: IReview[]
}
