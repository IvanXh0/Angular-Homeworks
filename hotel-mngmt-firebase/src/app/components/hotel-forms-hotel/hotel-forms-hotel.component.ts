import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map, mergeMap } from 'rxjs';
import { IRoom } from '../../interfaces/room-interface';
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
  hotelId: string = '';

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
    this.subscription = this.route.params
      .pipe(
        map((params) => params['id']),
        mergeMap((id) =>
          this.store
            .select(hotelsSelector)
            .pipe(
              map((hotels) => hotels.find((hotel) => hotel.id === id) || null)
            )
        )
      )
      .subscribe((hotel: IHotel | null) => {
        if (hotel) {
          this.isEditing = true;
          this.hotelId = hotel.id;
          this.hotelForm.patchValue(hotel);
          this.titleService.setTitle(`Edit Hotel | ${hotel?.name}`);
        } else {
          this.router.navigate(['/hotel-editor']);
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
    // if (this.isEditing) {
    //   const updatedHotel = {
    //     ...this.hotelForm.value,
    //     rooms: this.hotelForm.get('rooms')?.value,
    //   } as IHotel;

    //   this.store.dispatch(updateHotel({ hotel: updatedHotel }));
    // } else {
    //   this.store.dispatch(addHotel({ hotel: this.hotelForm.value as IHotel }));
    // }

    const hotel = {
      ...this.hotelForm.value,
      id: this.hotelId,
    } as IHotel;

    if (this.isEditing) {
      this.store.dispatch(updateHotel({ hotel }));
    } else {
      this.store.dispatch(addHotel({ hotel }));
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
