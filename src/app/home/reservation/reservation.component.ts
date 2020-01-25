import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Booking } from '../../booking'
import { BookingsService } from '../bookings.service'


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit  {
  
  test : string = "Fra reservationComponent"
  bookings: Booking[] = [];


  @Output() messageEvent = new EventEmitter<Booking>();

  constructor(
    private bookingService: BookingsService,
  ) { }


  NewBooking() {
    this.messageEvent.emit();
  }

  OpenBooking(booking: Booking) {
    this.messageEvent.emit(booking);
  }

  ngOnInit() {
    this.bookings = this.bookingService.GetBookings();
    console.log("OnInit");

  }



}
