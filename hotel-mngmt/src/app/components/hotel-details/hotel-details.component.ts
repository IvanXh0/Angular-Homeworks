import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IHotel } from 'src/app/interfaces/hotel-interface';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
})
export class HotelDetailsComponent implements OnInit, OnDestroy {
  selectedHotel: IHotel | undefined;

  private paramMapSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private hotelsService: HotelsService
  ) {}

  ngOnInit(): void {
    this.paramMapSubscription = this.route.paramMap.subscribe((params) => {
      let id = +params.get('id')!;
      this.selectedHotel = this.hotelsService.getHotelById(id);
      this.titleService.setTitle(`Hotel | ${this.selectedHotel?.name}`);
    });
  }

  ngOnDestroy(): void {
    this.paramMapSubscription?.unsubscribe();
  }
}
