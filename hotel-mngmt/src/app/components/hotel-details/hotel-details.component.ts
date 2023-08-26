import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map, mergeMap } from 'rxjs';
import { IHotel } from 'src/app/interfaces/hotel-interface';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
})
export class HotelDetailsComponent implements OnInit, OnDestroy {
  selectedHotel: IHotel | undefined;
  updatedAmenities: string[] = [];

  subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private hotelsService: HotelsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        map((params) => +params['id']),
        mergeMap((id) =>
          this.hotelsService.hotels$.pipe(
            map((hotels) => hotels.find((hotel) => hotel.id === id))
          )
        )
      )
      .subscribe((hotel) => {
        this.selectedHotel = hotel;
        this.titleService.setTitle(`Hotel | ${this.selectedHotel?.name}`);
      });
  }

  handleAmenitiesUpdated(updatedAmenities: string[]): void {
    this.updatedAmenities = updatedAmenities;
  }

  onEdit(hotelId: number, roomId: number): void {
    if (this.selectedHotel) {
      this.router.navigate(['/room-editor', hotelId, roomId]);
    }
  }

  onAddRoom(hotelId: number): void {
    if (this.selectedHotel) {
      this.router.navigate(['/room-editor', hotelId, 'rooms']);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
