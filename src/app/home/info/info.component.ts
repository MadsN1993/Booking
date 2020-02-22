import { Component, OnInit } from '@angular/core';
import { Booking } from '../../booking'
import { BookingsService } from '../bookings.service'

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  totalBookings : number = 0;
  totalGuests : number = 0;
  bookings: Booking[] = [];
  constructor(private bookingService: BookingsService) { }

  ngOnInit() {
    this.bookingService.cast.subscribe(() => this.calcInformation());
    this.totalGuests = 0;
    this.totalBookings = 0;
    this.bookings = this.bookingService.GetAllBookings(); 
    this.calcInformation();
  }

  calcInformation() {
    this.bookings = this.bookingService.GetAllBookings(); 
    var guests = 0; 
    var bookings = 0;
    this.bookings.forEach(function (booking) {
      guests = guests + booking.Guests;
      bookings = bookings + 1;
    });
    this.totalBookings = bookings; 
    this.totalGuests = guests;
  }

}
