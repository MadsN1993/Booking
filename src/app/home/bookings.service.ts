import { Injectable } from '@angular/core';
import { Booking } from '../booking';
import { NgbPopoverWindow } from '@ng-bootstrap/ng-bootstrap/popover/popover';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  bookings : Booking[] = [
    { Id: 1, Name: "testName", Telephone: 11111111, Email: "tt@hotmail.com", Guests: 1, Date: new Date(1988, 3, 15), Duration: 60, Outside:false },
    { Id: 2, Name: "testName", Telephone: 22222222, Email: "tt@hotmail.com", Guests: 2, Date: Date.now(), Duration: 60, Outside:true },
    { Id: 3, Name: "testName", Telephone: 33333333, Email: "tt@hotmail.com", Guests: 3, Date: Date.now(), Duration: 60, Outside:false },
    { Id: 4, Name: "testName", Telephone: 44444444, Email: "tt@hotmail.com", Guests: 4, Date: Date.now(), Duration: 60, Outside:false },
    { Id: 5, Name: "testName", Telephone: 55555555, Email: "tt@hotmail.com", Guests: 5, Date: Date.now(), Duration: 60, Outside:false },
    { Id: 6, Name: "testName", Telephone: 66666666, Email: "tt@hotmail.com", Guests: 6, Date: Date.now(), Duration: 60, Outside:false },
    { Id: 7, Name: "testName", Telephone: 77777777, Email: "tt@hotmail.com", Guests: 7, Date: Date.now(), Duration: 60, Outside:false },
    { Id: 8, Name: "testName", Telephone: 88888888, Email: "tt@hotmail.com", Guests: 8, Date: Date(), Duration: 60, Outside:false },
    { Id: 9, Name: "testName", Telephone: 99999999, Email: "tt@hotmail.com", Guests: 9, Date: Date.now(), Duration: 60, Outside:false },
    { Id: 10, Name: "testName", Telephone: 10101010, Email: "tt@hotmail.com", Guests: 10, Date: Date.now(), Duration: 60, Outside:true },
    { Id: 11, Name: "testName", Telephone: 11111111, Email: "tt@hotmail.com", Guests: 11, Date: Date.now(), Duration: 60, Outside:true },
    { Id: 12, Name: "testName", Telephone: 12121212, Email: "tt@hotmail.com", Guests: 12, Date: Date.now(), Duration: 60, Outside:true },
    { Id: 13, Name: "testName", Telephone: 13131313, Email: "tt@hotmail.com", Guests: 13, Date: Date.now(), Duration: 60, Outside:true },
    { Id: 14, Name: "testName", Telephone: 14141414, Email: "tt@hotmail.com", Guests: 14, Date: Date.now(), Duration: 60, Outside:true },
    { Id: 15, Name: "testName", Telephone: 15151515, Email: "tt@hotmail.com", Guests: 16, Date: Date.now(), Duration: 60, Outside:true }
  ]


  DeleteBooking(booking: Booking){
    const index = this.bookings.findIndex(b => b.Id == booking.Id);
    this.bookings.splice(index,1);

    this.bookings.forEach(b => console.log(b.Id));
    console.log("");

  }

  EditBooking(booking: Booking){
    const index = this.bookings.findIndex(b => b.Id == booking.Id);
    this.bookings[index] = booking;

    this.bookings.forEach(b => console.log(b.Id));
    console.log("");
  }

  GetId() : number {

    let ids = [];
    this.bookings.forEach(b => ids.push(b.Id));
    let newId = Math.max(...ids);
    return newId + 1;
  }

  AddBooking(booking: Booking){
    this.bookings.push(booking);

    this.bookings.forEach(b => console.log(b.Id));
    console.log("");

  }

  GetBookings(): Booking[]{
    return this.bookings;
  }

  constructor() { }
}

