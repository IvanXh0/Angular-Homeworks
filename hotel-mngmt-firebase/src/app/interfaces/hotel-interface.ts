import { IRoom } from './room-interface';

export interface IHotel {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  stars: number;
  image: string;
  rooms: IRoom[];
}
