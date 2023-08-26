import { createReducer, on } from '@ngrx/store';
import { HotelsState } from '../interfaces/hotel-state.interface';
import {
  addHotel,
  addHotelFailure,
  addHotelSuccess,
  addRoom,
  addRoomFailure,
  addRoomSuccess,
  getHotels,
  getHotelsFailure,
  getHotelsSuccess,
  updateHotel,
  updateHotelFailure,
  updateHotelSuccess,
  updateRoom,
  updateRoomFailure,
  updateRoomSuccess,
} from './hotels.actions';

export const initialState: HotelsState = {
  hotels: [],
  isLoading: false,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(getHotels, (state, action) => ({
    ...state,
    isLoading: true,
  })),
  on(getHotelsSuccess, (state, action) => ({
    ...state,
    hotels: action.hotels,
    isLoading: false,
  })),
  on(getHotelsFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false,
  })),
  on(addHotel, (state, action) => ({
    ...state,
    isLoading: true,
  })),
  on(addHotelSuccess, (state, action) => ({
    ...state,
    isLoading: false,
  })),
  on(addHotelFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(updateHotel, (state, action) => ({
    ...state,
    isLoading: true,
  })),
  on(updateHotelSuccess, (state, action) => ({
    ...state,
    isLoading: false,
  })),
  on(updateHotelFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(addRoom, (state, action) => ({
    ...state,
    isLoading: true,
  })),
  on(addRoomSuccess, (state, action) => ({
    ...state,
    isLoading: false,
  })),
  on(addRoomFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(updateRoom, (state, action) => ({
    ...state,
    isLoading: true,
  })),
  on(updateRoomSuccess, (state, action) => ({
    ...state,
    isLoading: false,
  })),
  on(updateRoomFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
