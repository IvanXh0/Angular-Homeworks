import { createAction, props } from '@ngrx/store';
import { IHotel } from '../interfaces/hotel-interface';
import { IRoom } from '../interfaces/room-interface';

export const getHotels = createAction('[Hotels] Get Hotels');

export const getHotelsSuccess = createAction(
  '[Hotels] Get Hotels Success',
  props<{ hotels: IHotel[] }>()
);

export const getHotelsFailure = createAction(
  '[Hotels] Get Hotels Failure',
  props<{ error: string }>()
);

export const addHotel = createAction(
  '[Hotels] Add Hotel',
  props<{ hotel: IHotel }>()
);

export const addHotelSuccess = createAction('[Hotels] Add Hotel Success');

export const addHotelFailure = createAction(
  '[Hotels] Add Hotel Failure',
  props<{ error: string }>()
);

export const updateHotel = createAction(
  '[Hotels] Update Hotel',
  props<{ hotel: IHotel }>()
);

export const updateHotelSuccess = createAction('[Hotels] Update Hotel Success');

export const updateHotelFailure = createAction(
  '[Hotels] Update Hotel Failure',
  props<{ error: string }>()
);

export const addRoom = createAction(
  '[Hotels] Add Room',
  props<{ hotelId: number; room: IRoom }>()
);

export const addRoomSuccess = createAction('[Hotels] Add Room Success');

export const addRoomFailure = createAction(
  '[Hotels] Add Room Failure',
  props<{ error: string }>()
);

export const updateRoom = createAction(
  '[Hotels] Update Room',
  props<{ hotelId: number; room: IRoom }>()
);

export const updateRoomSuccess = createAction('[Hotels] Update Room Success');

export const updateRoomFailure = createAction(
  '[Hotels] Update Room Failure',
  props<{ error: string }>()
);

export const getHotelById = createAction(
  '[Hotels] Get Hotel By Id',
  props<{ hotelId: number }>()
);

export const getHotelByIdSuccess = createAction(
  '[Hotels] Get Hotel By Id Success',
  props<{ hotel: IHotel }>()
);

export const getHotelByIdFailure = createAction(
  '[Hotels] Get Hotel By Id Failure',
  props<{ error: string }>()
);
