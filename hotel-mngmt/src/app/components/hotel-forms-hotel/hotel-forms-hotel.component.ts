import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRoom } from '../../interfaces/room-interface';
import { HotelsService } from 'src/app/services/hotels.service';
import { IHotel } from 'src/app/interfaces/hotel-interface';
import { FormUtilsService } from 'src/app/services/form-utils.service';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

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
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    rooms: new FormControl<IRoom[]>([]),
  });

  private paramMapSubscription: Subscription | undefined;

  isEditing: boolean = false;

  constructor(
    private hotelsService: HotelsService,
    private router: Router,
    private route: ActivatedRoute,
    private formUtils: FormUtilsService,
    private location: Location,
    private titleService: Title
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
    this.paramMapSubscription = this.route.paramMap.subscribe((params) => {
      let id = +params.get('id')!;

      if (id) {
        this.isEditing = true;
        const hotel = this.hotelsService.getHotelById(id);

        this.titleService.setTitle(`Edit Hotel | ${hotel?.name}`);

        if (hotel) {
          this.hotelForm.patchValue(hotel);
        }
      } else {
        this.titleService.setTitle(`Add Hotel`);
      }
    });
  }

  ngOnDestroy(): void {
    this.paramMapSubscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.isEditing) {
      const updatedHotel = {
        ...this.hotelForm.value,
        rooms: this.hotelForm.get('rooms')?.value,
      };
      this.hotelsService.updateHotel(updatedHotel as IHotel);
    } else {
      this.hotelsService.addHotel(this.hotelForm.value as IHotel);
    }

    this.router.navigate(['/management']);
  }

  onCancel(e: Event): void {
    e.preventDefault();
    this.location.back();
  }
}
