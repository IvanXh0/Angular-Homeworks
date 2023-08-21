import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelManagementComponent } from './components/hotel-management/hotel-management.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HotelFormsHotelComponent } from './components/hotel-forms-hotel/hotel-forms-hotel.component';
import { HotelFormsRoomsComponent } from './components/hotel-forms-rooms/hotel-forms-rooms.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'management',
    component: HotelManagementComponent,
  },
  {
    path: 'details/:id',
    component: HotelDetailsComponent,
  },
  {
    path: 'hotel-editor',
    component: HotelFormsHotelComponent,
  },
  {
    path: 'hotel-editor/:id',
    component: HotelFormsHotelComponent,
  },
  {
    path: 'room-editor/:hotelId/rooms',
    component: HotelFormsRoomsComponent,
  },
  {
    path: 'room-editor/:hotelId/:roomId',
    component: HotelFormsRoomsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
