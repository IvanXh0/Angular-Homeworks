import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { IHotel } from 'src/app/inerfaces/hotel-inerface';

@Component({
  selector: 'app-hotel-management',
  templateUrl: './hotel-management.component.html',
  styleUrls: ['./hotel-management.component.css'],
})
export class HotelManagementComponent implements AfterViewInit, OnInit {
  hotels: IHotel[] = [
    {
      id: 1,
      name: 'Luxury Resort',
      address: '123 Ocean View Lane',
      city: 'Paradise City',
      country: 'Tropical Island',
      stars: 5,
      image: 'https://source.unsplash.com/random/?hotel',
      rooms: [
        {
          id: 1,
          name: 'Ocean View Suite',
          description: 'A spacious suite with a breathtaking ocean view.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 300,
          persons: 2,
          children: 1,
          amenities: [
            'TV',
            'Air Conditioning',
            'Mini Bar',
            'Balcony',
            'Free WiFi',
          ],
          isAvailable: true,
        },
        {
          id: 2,
          name: 'Ocean View Suite 2',
          description: 'A spacious suite with a breathtaking mountain view.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 600,
          persons: 4,
          children: 2,
          amenities: [
            'TV',
            'Air Conditioning',
            'Mini Bar',
            'Balcony',
            'Free WiFi',
          ],
          isAvailable: false,
        },
        {
          id: 3,
          name: 'Ocean View Suite 3',
          description: 'A spacious suite with a breathtaking mountain view.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 600,
          persons: 4,
          children: 2,
          amenities: ['TV', 'Air Conditioning', 'Free WiFi'],
          isAvailable: true,
        },
      ],
    },
    {
      id: 2,
      name: 'Urban Retreat Hotel',
      address: '456 Downtown Street',
      city: 'Metropolis',
      country: 'Modernland',
      stars: 4,
      image: 'https://source.unsplash.com/random/?hotel',
      rooms: [
        {
          id: 1,
          name: 'Executive Suite',
          description:
            'A sophisticated suite for business and leisure travelers.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 200,
          persons: 2,
          children: 0,
          amenities: ['TV', 'Air Conditioning', 'Work Desk', 'Free WiFi'],
          isAvailable: true,
        },
        {
          id: 2,
          name: 'Standard Room',
          description: 'Comfortable room with city view.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 150,
          persons: 2,
          children: 1,
          amenities: ['TV', 'Air Conditioning', 'Free WiFi'],
          isAvailable: true,
        },
      ],
    },
    {
      id: 3,
      name: 'Mountain Lodge',
      address: '789 Alpine Trail',
      city: "Hiker's Haven",
      country: 'Natureland',
      stars: 3,
      image: 'https://source.unsplash.com/random/?hotel',
      rooms: [
        {
          id: 1,
          name: 'Cozy Cabin',
          description: 'A rustic cabin with beautiful mountain views.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 150,
          persons: 4,
          children: 2,
          amenities: ['Fireplace', 'Kitchenette', 'Free WiFi'],
          isAvailable: true,
        },
      ],
    },
    {
      id: 4,
      name: 'Rustic Lodge Retreat',
      address: '123 Woodland Trail',
      city: 'Forestville',
      country: 'Woodland',
      stars: 3,
      image: 'https://source.unsplash.com/random/?hotel',
      rooms: [
        {
          id: 1,
          name: 'Log Cabin',
          description: 'Cozy log cabin amidst the woods.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 180,
          persons: 2,
          children: 0,
          amenities: ['Fireplace', 'Kitchenette', 'Free WiFi'],
          isAvailable: true,
        },
        {
          id: 2,
          name: 'Forest View Suite',
          description: 'Suite with a view of the lush forest.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 220,
          persons: 2,
          children: 1,
          amenities: ['TV', 'Air Conditioning', 'Free WiFi'],
          isAvailable: true,
        },
      ],
    },
    {
      id: 5,
      name: 'Seaside Paradise Resort',
      address: '789 Sandy Beach Road',
      city: 'Sunny Beach',
      country: 'Beachland',
      stars: 4,
      image: 'https://source.unsplash.com/random/?hotel',
      rooms: [
        {
          id: 1,
          name: 'Oceanfront Suite',
          description: 'A luxurious suite right by the ocean.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 400,
          persons: 2,
          children: 1,
          amenities: [
            'TV',
            'Air Conditioning',
            'Mini Bar',
            'Balcony',
            'Free WiFi',
          ],
          isAvailable: true,
        },
        {
          id: 2,
          name: 'Family Bungalow',
          description: 'Spacious bungalow for a family getaway.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 350,
          persons: 4,
          children: 2,
          amenities: ['TV', 'Air Conditioning', 'Kitchenette', 'Free WiFi'],
          isAvailable: true,
        },
      ],
    },
    {
      id: 6,
      name: 'Mountain Chalet Retreat',
      address: '456 Alpine Trail',
      city: 'Mountainville',
      country: 'Mountainland',
      stars: 4,
      image: 'https://source.unsplash.com/random/?hotel',
      rooms: [
        {
          id: 1,
          name: 'Mountain View Suite',
          description: 'Suite with breathtaking mountain views.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 300,
          persons: 2,
          children: 0,
          amenities: ['TV', 'Air Conditioning', 'Balcony', 'Free WiFi'],
          isAvailable: true,
        },
        {
          id: 2,
          name: 'Rustic Cabin',
          description: 'Cozy cabin surrounded by nature.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 180,
          persons: 4,
          children: 2,
          amenities: ['Fireplace', 'Kitchenette', 'Free WiFi'],
          isAvailable: true,
        },
      ],
    },
    {
      id: 7,
      name: 'City Skyline Hotel',
      address: '789 Downtown Avenue',
      city: 'Metropolis',
      country: 'Urbanland',
      stars: 4,
      image: 'https://source.unsplash.com/random/?hotel',
      rooms: [
        {
          id: 1,
          name: 'Executive Suite',
          description: 'Luxurious suite with stunning city views.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 400,
          persons: 2,
          children: 0,
          amenities: ['TV', 'Air Conditioning', 'Work Desk', 'Free WiFi'],
          isAvailable: true,
        },
        {
          id: 2,
          name: 'Standard Room',
          description: 'Comfortable room in the heart of the city.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 250,
          persons: 2,
          children: 1,
          amenities: ['TV', 'Air Conditioning', 'Free WiFi'],
          isAvailable: true,
        },
      ],
    },
    {
      id: 8,
      name: 'Oceanfront Paradise Resort',
      address: '123 Sandy Beach Road',
      city: 'Sunny Beach',
      country: 'Beachland',
      stars: 5,
      image: 'https://source.unsplash.com/random/?hotel',
      rooms: [
        {
          id: 1,
          name: 'Deluxe Ocean Suite',
          description: 'A luxurious suite with direct ocean access.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 500,
          persons: 2,
          children: 1,
          amenities: [
            'TV',
            'Air Conditioning',
            'Mini Bar',
            'Balcony',
            'Free WiFi',
          ],
          isAvailable: true,
        },
        {
          id: 2,
          name: 'Beachfront Villa',
          description: 'Spacious villa steps away from the beach.',
          image: 'https://source.unsplash.com/random/?hotel',
          price: 700,
          persons: 6,
          children: 3,
          amenities: ['Private Pool', 'Kitchen', 'Free WiFi'],
          isAvailable: true,
        },
      ],
    },
  ];

  displayedColumns: string[] = ['name', 'stars', 'address', 'rooms'];
  dataSource: MatTableDataSource<IHotel>;

  constructor(private titleService: Title) {
    this.dataSource = new MatTableDataSource();
    this.titleService.setTitle('Hotel | Management');
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource.data = this.hotels;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
