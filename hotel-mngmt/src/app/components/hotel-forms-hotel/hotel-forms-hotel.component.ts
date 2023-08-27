import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map, mergeMap } from 'rxjs';
import { IRoom } from '../../interfaces/room-interface';
import { HotelsService } from 'src/app/services/hotels.service';
import { IHotel } from 'src/app/interfaces/hotel-interface';
import { FormUtilsService } from 'src/app/services/form-utils.service';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { HotelsState } from 'src/app/interfaces/hotel-state.interface';
import { hotelsSelector } from 'src/app/store/hotels.selectors';
import { addHotel, updateHotel } from 'src/app/store/hotels.actions';

@Component({
  selector: 'app-hotel-forms-hotel',
  templateUrl: './hotel-forms-hotel.component.html',
  styleUrls: ['./hotel-forms-hotel.component.css'],
})
export class HotelFormsHotelComponent implements OnInit, OnDestroy {
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
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/),
      ])
    ),
    rooms: new FormControl<IRoom[]>([]),
  });

  subscription: Subscription = new Subscription();

  isEditing: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formUtils: FormUtilsService,
    private location: Location,
    private titleService: Title,
    private store: Store<HotelsState>
  ) {}

  isFieldInvalid(fieldName: string): boolean {
    const control = this.hotelForm.get(fieldName);
    return this.formUtils.isFieldInvalid(control);
  }

  isFieldTouchedOrDirty(fieldName: string): boolean {
    const control = this.hotelForm.get(fieldName);
    return this.formUtils.isFieldTouchedOrDirty(control);
  }

  isRequired(fieldName: string): boolean {
    const control = this.hotelForm.get(fieldName);
    return this.formUtils.isRequired(control);
  }

  isNotUrl(fieldName: string): boolean {
    const control = this.hotelForm.get(fieldName);
    return this.formUtils.isNotUrl(control);
  }

  isMinLength(fieldName: string): boolean {
    const control = this.hotelForm.get(fieldName);
    return this.formUtils.isMinLength(control);
  }

  isMaxLength(fieldName: string): boolean {
    const control = this.hotelForm.get(fieldName);
    return this.formUtils.isMaxLength(control);
  }

  isMin(fieldName: string): boolean {
    const control = this.hotelForm.get(fieldName);
    return this.formUtils.isMin(control);
  }

  isMax(fieldName: string): boolean {
    const control = this.hotelForm.get(fieldName);
    return this.formUtils.isMax(control);
  }

  ngOnInit(): void {
    const isEditing = this.route.snapshot.data['isEditing'] || false;
    this.subscription = this.route.params
      .pipe(
        map((params) => +params['id']),
        mergeMap((id) =>
          this.store
            .select(hotelsSelector)
            .pipe(map((hotels) => hotels.find((hotel) => hotel.id === id)))
        )
      )
      .subscribe((hotel: IHotel | undefined) => {
        if (hotel) {
          this.isEditing = true;
          this.hotelForm.patchValue(hotel);
          this.titleService.setTitle(`Edit Hotel | ${hotel?.name}`);
        }

        if (!hotel && !this.isEditing) {
          this.isEditing = false;
          this.titleService.setTitle(`Add Hotel`);
        }

        if (!hotel && this.isEditing) {
          this.titleService.setTitle(`Hotel | Not Found`);
          this.router.navigate(['/not-found']);
        }
      });
  }

  onSubmit(): void {
    if (this.isEditing) {
      const updatedHotel = {
        ...this.hotelForm.value,
        rooms: this.hotelForm.get('rooms')?.value,
      } as IHotel;

      this.store.dispatch(updateHotel({ hotel: updatedHotel }));
    } else {
      this.store.dispatch(addHotel({ hotel: this.hotelForm.value as IHotel }));
    }

    this.router.navigate(['/management']);
  }

  onCancel(e: Event): void {
    e.preventDefault();
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
