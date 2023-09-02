import { IHotel } from './hotel-interface';

export interface HotelsState {
  hotels: IHotel[];
  isLoading: boolean;
  error: string;
}
