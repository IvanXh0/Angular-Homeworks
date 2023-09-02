import { Injectable } from '@angular/core';
import { IHotel } from '../interfaces/hotel-interface';
import { IRoom } from '../interfaces/room-interface';
import { Observable, from, mergeMap, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  constructor(private firestore: AngularFirestore) {}

  getHotels(): Observable<IHotel[]> {
    return this.firestore.collection<IHotel>('hotels').valueChanges({
      idField: 'id',
    });
  }

  addHotel(hotel: IHotel): Observable<IHotel | unknown> {
    return from(this.firestore.collection('hotels').add(hotel));
  }

  updateHotel(hotel: IHotel): Observable<void> {
    return from(
      this.firestore.collection('hotels').doc(hotel.id).update(hotel)
    );
  }

  updateRoom(hotelId: string, room: IRoom): Observable<void | null> {
    return this.firestore
      .collection('hotels')
      .doc(hotelId)
      .get()
      .pipe(
        mergeMap((hotel) => {
          if (!hotel.exists) {
            return of(null);
          }

          const hotelData = hotel.data() as IHotel;

          const roomIndex = hotelData.rooms.findIndex((r) => r.id === room.id);
          console.log(roomIndex);

          if (roomIndex !== -1) {
            hotelData.rooms[roomIndex] = {
              ...hotelData.rooms[roomIndex],
              ...room,
            };
          }

          return from(
            this.firestore.collection('hotels').doc(hotelId).update({
              rooms: hotelData.rooms,
            })
          );
        })
      );
  }

  addRoom(hotelId: string, room: IRoom): Observable<void | null> {
    return this.firestore
      .collection('hotels')
      .doc(hotelId)
      .get()
      .pipe(
        mergeMap((hotel) => {
          if (!hotel.exists) {
            return of(null);
          }

          const hotelData = hotel.data() as IHotel;
          const rooms = hotelData.rooms;
          rooms.push(room);

          return from(
            this.firestore.collection('hotels').doc(hotelId).update({ rooms })
          );
        })
      );
  }
}
