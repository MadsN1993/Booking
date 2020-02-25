import { Injectable } from '@angular/core';
import { Booking } from '../booking';
import { NgbPopoverWindow } from '@ng-bootstrap/ng-bootstrap/popover/popover';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  bookings : Booking[] = [
    { Id: 1, Name: "Adam", Telephone: 11111111, Email: "tt@hotmail.com", Guests: 2, Date: new Date(1988, 3, 15), Duration: 60, Outside:false, TableNumber:1, Time: {hour: 10, minute: 30} },
    { Id: 2, Name: "Anders", Telephone: 22222222, Email: "tt@hotmail.com", Guests: 2, Date: Date.now(), Duration: 60, Outside:true, TableNumber:2, Time: {hour: 11, minute: 30} },
    { Id: 3, Name: "Morten", Telephone: 33333333, Email: "tt@hotmail.com", Guests: 4, Date: Date.now(), Duration: 60, Outside:false, TableNumber:3, Time: {hour: 12, minute: 30} },
    { Id: 4, Name: "Kristoffer", Telephone: 44444444, Email: "tt@hotmail.com", Guests: 2, Date: Date.now(), Duration: 60, Outside:false, TableNumber:4, Time: {hour: 13, minute: 30} },
    { Id: 5, Name: "Line", Telephone: 55555555, Email: "tt@hotmail.com", Guests: 5, Date: Date.now(), Duration: 60, Outside:false, TableNumber:5, Time: {hour: 14, minute: 30} },
    { Id: 6, Name: "Christian", Telephone: 66666666, Email: "tt@hotmail.com", Guests: 4, Date: Date.now(), Duration: 60, Outside:false, TableNumber:6, Time: {hour: 15, minute: 30} },
    { Id: 7, Name: "Mads", Telephone: 77777777, Email: "tt@hotmail.com", Guests: 2, Date: Date.now(), Duration: 60, Outside:false, TableNumber:7, Time: {hour: 16, minute: 30} },
    { Id: 8, Name: "John", Telephone: 88888888, Email: "tt@hotmail.com", Guests: 2, Date: Date(), Duration: 60, Outside:false, TableNumber:8, Time: {hour: 17, minute: 30} },
    { Id: 9, Name: "Ingrid", Telephone: 99999999, Email: "tt@hotmail.com", Guests: 4, Date: Date.now(), Duration: 60, Outside:false, TableNumber:9, Time: {hour: 18, minute: 30} },
    { Id: 10, Name: "Ole", Telephone: 10101010, Email: "tt@hotmail.com", Guests: 3, Date: Date.now(), Duration: 60, Outside:true, TableNumber:10, Time: {hour: 19, minute: 30} },
    { Id: 11, Name: "Sebastian", Telephone: 11111111, Email: "tt@hotmail.com", Guests: 2, Date: Date.now(), Duration: 60, Outside:true, TableNumber:11, Time: {hour: 20, minute: 30} },
    { Id: 12, Name: "Jacob", Telephone: 12121212, Email: "tt@hotmail.com", Guests: 1, Date: Date.now(), Duration: 60, Outside:true, TableNumber:12, Time: {hour: 12, minute: 30} },
    { Id: 13, Name: "Jakob", Telephone: 13131313, Email: "tt@hotmail.com", Guests: 4, Date: Date.now(), Duration: 60, Outside:true, TableNumber:13, Time: {hour: 13, minute: 30} },
    { Id: 14, Name: "Kim", Telephone: 14141414, Email: "tt@hotmail.com", Guests: 3, Date: Date.now(), Duration: 60, Outside:true, TableNumber:14, Time: {hour: 14, minute: 30} },
    { Id: 15, Name: "Sanne", Telephone: 15151515, Email: "tt@hotmail.com", Guests: 6, Date: Date.now(), Duration: 60, Outside:true, TableNumber:15, Time: {hour: 15, minute: 30} }
  ]


  private changes = new BehaviorSubject<boolean>(false);
  cast = this.changes.asObservable(); 

  currentSearchText : string = "";
  fromTime = {hour: 0, minute: 0};
  ToTime = {hour: 23, minute: 59};
  filteredBookings : Booking[] = [];

  DeleteBooking(booking: Booking){
    const index = this.bookings.findIndex(b => b.Id == booking.Id);
    this.bookings.splice(index,1);

    // this.bookings.forEach(b => console.log(b.Id));
    // console.log("");
    this.FilterBookings(this.currentSearchText, this.fromTime, this.ToTime);
    this.changes.next(true);
  }

  FilterBookings(searchText : string, fromTime, ToTime) {
    this.currentSearchText = searchText;
    this.fromTime = fromTime;
    this.ToTime = ToTime;
    var filtered : Booking[] = [];
    this.bookings.forEach(function (booking) {
      if (booking.Name.includes(searchText)) {
        if (booking.Time.hour > fromTime.hour || (booking.Time.hour == fromTime.hour && booking.Time.minute >= fromTime.minute)) {
          if (booking.Time.hour < ToTime.hour || (booking.Time.hour == ToTime.hour && booking.Time.minute <= ToTime.minute)) {
            filtered.push(booking);
          }
        } 
      }
    });

    this.filteredBookings = filtered;
    this.changes.next(true);
  }

  EditBooking(booking: Booking){
    const index = this.bookings.findIndex(b => b.Id == booking.Id);
    this.bookings[index] = booking;

    this.bookings.forEach(b => console.log(b.Id));
    console.log("");
    this.changes.next(true);
  }

  GetId() : number {

    let ids = [];
    this.bookings.forEach(b => ids.push(b.Id));
    let newId = Math.max(...ids);
    return newId + 1;
  }

  AddBooking(booking: Booking){
    this.bookings.push(booking);

    // this.bookings.forEach(b => console.log(b.Id));
    // console.log("");
    this.FilterBookings(this.currentSearchText, this.fromTime, this.ToTime);
    this.changes.next(true);
  }

  GetBookings(): Booking[]{
    return this.filteredBookings;
  }

  GetAllBookings(): Booking[]{
    return this.bookings;
  }

  constructor() { this.filteredBookings = this.bookings}
}

