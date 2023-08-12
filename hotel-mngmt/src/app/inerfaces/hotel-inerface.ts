interface IRoom {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  persons: number;
  children: number;
  amenities: string[];
  isAvailable: boolean;
}

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
