import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { IHotel } from 'src/app/interfaces/hotel-interface';
import { HotelsState } from 'src/app/interfaces/hotel-state.interface';
import { getHotels } from 'src/app/store/hotels.actions';
import { hotelsSelector } from 'src/app/store/hotels.selectors';

@Component({
  selector: 'app-hotel-management',
  templateUrl: './hotel-management.component.html',
  styleUrls: ['./hotel-management.component.css'],
})
export class HotelManagementComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  hotels$: Observable<IHotel[]> = new Observable<IHotel[]>();

  subscription: Subscription = new Subscription();

  displayedColumns: string[] = ['name', 'stars', 'address', 'rooms', 'actions'];
  dataSource: MatTableDataSource<IHotel>;

  constructor(
    private titleService: Title,
    private store: Store<HotelsState>,
    private router: Router
  ) {
    this.titleService.setTitle('Hotel | Management');
    this.dataSource = new MatTableDataSource();
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.hotels$ = this.store.select(hotelsSelector);

    this.subscription = this.hotels$
      .pipe(
        tap((hotels) => {
          this.dataSource.data = hotels;
        })
      )
      .subscribe();

    this.store.dispatch(getHotels());
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onEdit(hotelId: string): void {
    this.router.navigate(['/hotel-editor', hotelId]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
