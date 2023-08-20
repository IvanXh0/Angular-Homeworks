import { IRoom } from './room-interface';

export interface IHotel {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  stars: number;
  image: string;
  rooms: IRoom[];
}
