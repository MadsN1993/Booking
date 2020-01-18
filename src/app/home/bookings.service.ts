import { Injectable } from '@angular/core';
import { Booking } from '../booking';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  bookings : Booking[] = [
    { Name: "testName", TelephoneNumber: 11111111, Email: "tt@hotmail.com", Guests: 1, Date: Date.now(), Duration: 60, Outside:false },
    { Name: "testName", TelephoneNumber: 22222222, Email: "tt@hotmail.com", Guests: 2, Date: Date.now(), Duration: 60, Outside:true },
    { Name: "testName", TelephoneNumber: 33333333, Email: "tt@hotmail.com", Guests: 3, Date: Date.now(), Duration: 60, Outside:false },
    { Name: "testName", TelephoneNumber: 44444444, Email: "tt@hotmail.com", Guests: 4, Date: Date.now(), Duration: 60, Outside:false },
    { Name: "testName", TelephoneNumber: 55555555, Email: "tt@hotmail.com", Guests: 5, Date: Date.now(), Duration: 60, Outside:false },
    { Name: "testName", TelephoneNumber: 66666666, Email: "tt@hotmail.com", Guests: 6, Date: Date.now(), Duration: 60, Outside:false },
    { Name: "testName", TelephoneNumber: 77777777, Email: "tt@hotmail.com", Guests: 7, Date: Date.now(), Duration: 60, Outside:false },
    { Name: "testName", TelephoneNumber: 88888888, Email: "tt@hotmail.com", Guests: 8, Date: Date.now(), Duration: 60, Outside:false },
    { Name: "testName", TelephoneNumber: 99999999, Email: "tt@hotmail.com", Guests: 9, Date: Date.now(), Duration: 60, Outside:false },
    { Name: "testName", TelephoneNumber: 10101010, Email: "tt@hotmail.com", Guests: 10, Date: Date.now(), Duration: 60, Outside:true }
  ]

  GetBookings(): Booking[]{
    return this.bookings;
  }

  constructor() { }
}

