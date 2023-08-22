import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRoom } from 'src/app/interfaces/room-interface';
import { FormUtilsService } from 'src/app/services/form-utils.service';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-hotel-forms-rooms',
  templateUrl: './hotel-forms-rooms.component.html',
  styleUrls: ['./hotel-forms-rooms.component.css'],
})
export class HotelFormsRoomsComponent implements OnInit, OnDestroy {
  roomForm = new FormGroup({
    id: new FormControl<number>(Date.now()),
    name: new FormControl<string>(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])
    ),
    description: new FormControl<string>(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
      ])
    ),
    image: new FormControl<string>(
      '',
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    price: new FormControl<number>(
      0,
      Validators.compose([Validators.required, Validators.min(1)])
    ),
    persons: new FormControl<number>(
      0,
      Validators.compose([Validators.required, Validators.min(1)])
    ),
    children: new FormControl<number>(
      0,
      Validators.compose([Validators.required, Validators.min(0)])
    ),
    amenities: new FormControl<string[]>([], Validators.required),
    isAvailable: new FormControl<boolean>(true, Validators.required),
  });

  private paramMapSubscription: Subscription | undefined;

  isEditing: boolean = false;
  hotelId: number | undefined;
  shouldRedirect: boolean = false;

  constructor(
    private hotelsService: HotelsService,
    private route: ActivatedRoute,
    private location: Location,
    private formUtils: FormUtilsService,
    private titleService: Title
  ) {}

  isFieldInvalid(fieldName: string): boolean {
    const control = this.roomForm.get(fieldName);
    return this.formUtils.isFieldInvalid(control);
  }

  isFieldTouchedOrDirty(fieldName: string): boolean {
    const control = this.roomForm.get(fieldName);
    return this.formUtils.isFieldTouchedOrDirty(control);
  }

  isRequired(fieldName: string): boolean {
    const control = this.roomForm.get(fieldName);
    return this.formUtils.isRequired(control);
  }

  isMinLength(fieldName: string): boolean {
    const control = this.roomForm.get(fieldName);
    return this.formUtils.isMinLength(control);
  }

  isMaxLength(fieldName: string): boolean {
    const control = this.roomForm.get(fieldName);
    return this.formUtils.isMaxLength(control);
  }

  isMin(fieldName: string): boolean {
    const control = this.roomForm.get(fieldName);
    return this.formUtils.isMin(control);
  }

  ngOnInit(): void {
    this.paramMapSubscription = this.route.paramMap.subscribe((params) => {
      let hotelId = +params.get('hotelId')!;
      let roomId = +params.get('roomId')!;

      const room = this.hotelsService.getRoomById(hotelId, roomId);
      const hotel = this.hotelsService.getHotelById(hotelId);

      if (hotelId && roomId) {
        const roomName = this.hotelsService.getRoomById(hotelId, roomId)?.name;
        this.titleService.setTitle(`Edit Room | ${roomName}`);

        this.hotelId = hotelId;
        this.isEditing = true;

        room?.amenities.join(', ');
        this.roomForm.patchValue(room as IRoom);
      }

      if (hotelId && !roomId) {
        this.hotelId = hotelId;
        this.isEditing = false;

        const hotelName = this.hotelsService.getHotelById(hotelId)?.name;
        this.titleService.setTitle(`Add Room | ${hotelName}`);
      }

      if (!room && this.isEditing) {
        this.titleService.setTitle(`Room | Not Found`);
        this.shouldRedirect = true;
        return;
      }

      if (!hotel && !this.isEditing) {
        this.titleService.setTitle(`Hotel | Not Found`);
        this.shouldRedirect = true;
        return;
      }
    });
  }

  ngOnDestroy(): void {
    this.paramMapSubscription?.unsubscribe();
  }

  onSubmit(): void {
    if (this.isEditing) {
      // const updatedRoom = this.roomForm.value as IRoom;
      // updatedRoom.amenities = (updatedRoom.amenities as unknown as string)
      //   .split(',')
      //   .map((a) => a.trim());

      const updatedRoom = this.roomForm.value as IRoom;
      updatedRoom.amenities = Array.isArray(updatedRoom.amenities)
        ? updatedRoom.amenities
        : [updatedRoom.amenities];

      this.hotelsService.updateRoom(this.hotelId!, updatedRoom);
    } else {
      const newRoom = this.roomForm.value as IRoom;
      newRoom.amenities = Array.isArray(newRoom.amenities)
        ? newRoom.amenities
        : [newRoom.amenities];
      this.hotelsService.addRoom(this.hotelId!, newRoom);
    }
    this.location.back();
  }

  onCancel(e: Event): void {
    e.preventDefault();
    this.location.back();
  }
}
