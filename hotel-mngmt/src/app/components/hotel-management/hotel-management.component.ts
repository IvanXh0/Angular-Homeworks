import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IHotel } from 'src/app/interfaces/hotel-interface';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-hotel-management',
  templateUrl: './hotel-management.component.html',
  styleUrls: ['./hotel-management.component.css'],
})
export class HotelManagementComponent implements AfterViewInit, OnInit {
  hotels: IHotel[] = [];

  displayedColumns: string[] = ['name', 'stars', 'address', 'rooms', 'actions'];
  dataSource: MatTableDataSource<IHotel>;

  constructor(
    private titleService: Title,
    private hotelsService: HotelsService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
    this.titleService.setTitle('Hotel | Management');
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getHotels();
    this.dataSource.data = this.hotels;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getHotels(): IHotel[] {
    return (this.hotels = this.hotelsService.getHotels());
  }

  onEdit(hotelId: number): void {
    this.router.navigate(['/hotel-editor', hotelId]);
  }
}
