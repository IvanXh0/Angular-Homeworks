import { IHotel } from './../interfaces/hotel-interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HotelsService } from '../services/hotels.service';
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
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IRoom } from '../interfaces/room-interface';

@Injectable()
export class HotelsEffects {
  constructor(
    private actions$: Actions,
    private hotelsService: HotelsService
  ) {}

  getHotels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getHotels),
      mergeMap(() =>
        this.hotelsService.getHotels().pipe(
          map((hotels) => getHotelsSuccess({ hotels })),
          catchError((error) => of(getHotelsFailure({ error: error.message })))
        )
      )
    )
  );

  addHotel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addHotel),
      tap(({ hotel }: { hotel: IHotel }) => this.hotelsService.addHotel(hotel)),
      map(() => addHotelSuccess()),
      catchError((error) => of(addHotelFailure({ error: error.message })))
    )
  );

  updateHotel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateHotel),
      tap(({ hotel }: { hotel: IHotel }) =>
        this.hotelsService.updateHotel(hotel)
      ),
      map(() => updateHotelSuccess()),
      catchError((error) => of(updateHotelFailure({ error: error.message })))
    )
  );

  addRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRoom),
      tap(({ hotelId, room }: { hotelId: number; room: IRoom }) =>
        this.hotelsService.addRoom(hotelId, room)
      ),
      map(() => addRoomSuccess()),
      catchError((error) => of(addRoomFailure({ error: error.message })))
    )
  );

  updateRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRoom),
      tap(({ hotelId, room }: { hotelId: number; room: IRoom }) =>
        this.hotelsService.updateRoom(hotelId, room)
      ),
      map(() => updateRoomSuccess()),
      catchError((error) => of(updateRoomFailure({ error: error.message })))
    )
  );
}
