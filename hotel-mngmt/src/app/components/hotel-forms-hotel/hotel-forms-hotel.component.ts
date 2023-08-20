import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-hotel-forms-hotel',
  templateUrl: './hotel-forms-hotel.component.html',
  styleUrls: ['./hotel-forms-hotel.component.css'],
})
export class HotelFormsHotelComponent implements OnInit {
  hotelForm = new FormGroup({
    id: new FormControl<number>(Date.now()),
    name: new FormControl<string>(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])
    ),
    address: new FormControl<string>(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])
    ),
    city: new FormControl<string>(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ])
    ),
    country: new FormControl<string>(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ])
    ),
    stars: new FormControl<number>(
      0,
      Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ])
    ),
    image: new FormControl<string>(
      '',
      Validators.compose([Validators.required])
    ),
  });

  private paramMapSubscription: Subscription | undefined;

  isEditing: boolean = false;

  constructor(
    private hotelsService: HotelsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramMapSubscription = this.route.paramMap.subscribe((params) => {
      let id = +params.get('id')!;

      if (id) {
        this.isEditing = true;
        const hotel = this.hotelsService.getHotelById(id);

        if (hotel) {
          this.hotelForm.patchValue(hotel);
          console.log(hotel);
        }
      }
    });
  }
}
