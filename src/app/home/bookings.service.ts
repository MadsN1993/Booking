import { Injectable } from '@angular/core';
import { Booking } from '../booking';
import { NgbPopoverWindow } from '@ng-bootstrap/ng-bootstrap/popover/popover';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  bookings : Booking[] = [
    { Id: 1, Name: "AtestName", Telephone: 11111111, Email: "tt@hotmail.com", Guests: 1, Date: new Date(1988, 3, 15), Duration: 60, Outside:false, Time: {hour: 10, minute: 30}},
    { Id: 2, Name: "BtestName", Telephone: 22222222, Email: "tt@hotmail.com", Guests: 2, Date: Date.now(), Duration: 60, Outside:true, Time: {hour: 10, minute: 30} },
    { Id: 3, Name: "CtestName", Telephone: 33333333, Email: "tt@hotmail.com", Guests: 3, Date: Date.now(), Duration: 60, Outside:false, Time: {hour: 10, minute: 30}},
    { Id: 4, Name: "DtestName", Telephone: 44444444, Email: "tt@hotmail.com", Guests: 4, Date: Date.now(), Duration: 60, Outside:false, Time: {hour: 10, minute: 30} },
    { Id: 5, Name: "EtestName", Telephone: 55555555, Email: "tt@hotmail.com", Guests: 5, Date: Date.now(), Duration: 60, Outside:false, Time: {hour: 10, minute: 30} },
    { Id: 6, Name: "FtestName", Telephone: 66666666, Email: "tt@hotmail.com", Guests: 6, Date: Date.now(), Duration: 60, Outside:false, Time: {hour: 10, minute: 30} },
    { Id: 7, Name: "GtestName", Telephone: 77777777, Email: "tt@hotmail.com", Guests: 7, Date: Date.now(), Duration: 60, Outside:false, Time: {hour: 10, minute: 30} },
    { Id: 8, Name: "HtestName", Telephone: 88888888, Email: "tt@hotmail.com", Guests: 8, Date: Date(), Duration: 60, Outside:false, Time: {hour: 10, minute: 30} },
    { Id: 9, Name: "ItestName", Telephone: 99999999, Email: "tt@hotmail.com", Guests: 9, Date: Date.now(), Duration: 60, Outside:false, Time: {hour: 10, minute: 30} },
    { Id: 10, Name: "JtestName", Telephone: 10101010, Email: "tt@hotmail.com", Guests: 10, Date: Date.now(), Duration: 60, Outside:true, Time: {hour: 10, minute: 30} },
    { Id: 11, Name: "KtestName", Telephone: 11111111, Email: "tt@hotmail.com", Guests: 11, Date: Date.now(), Duration: 60, Outside:true, Time: {hour: 10, minute: 30} },
    { Id: 12, Name: "LtestName", Telephone: 12121212, Email: "tt@hotmail.com", Guests: 12, Date: Date.now(), Duration: 60, Outside:true, Time: {hour: 10, minute: 30} },
    { Id: 13, Name: "MtestName", Telephone: 13131313, Email: "tt@hotmail.com", Guests: 13, Date: Date.now(), Duration: 60, Outside:true, Time: {hour: 10, minute: 30} },
    { Id: 14, Name: "NtestName", Telephone: 14141414, Email: "tt@hotmail.com", Guests: 14, Date: Date.now(), Duration: 60, Outside:true, Time: {hour: 10, minute: 30} },
    { Id: 15, Name: "OtestName", Telephone: 15151515, Email: "tt@hotmail.com", Guests: 16, Date: Date.now(), Duration: 60, Outside:true, Time: {hour: 10, minute: 30} }
  ]

  private changes = new BehaviorSubject<boolean>(false);
  cast = this.changes.asObservable(); 

  currentSearchText : string = "";
  filteredBookings : Booking[] = [];

  DeleteBooking(booking: Booking){
    const index = this.bookings.findIndex(b => b.Id == booking.Id);
    this.bookings.splice(index,1);

    this.bookings.forEach(b => console.log(b.Id));
    console.log("");
    this.FilterBookings(this.currentSearchText, 0, 0);
    this.changes.next(true);
  }

  FilterBookings(searchText : string, fromTime, ToTime) {
    this.currentSearchText = searchText;
    var filtered : Booking[] = [];
    this.bookings.forEach(function (booking) {
      if (booking.Name.includes(searchText)) {  
        filtered.push(booking);
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

    this.bookings.forEach(b => console.log(b.Id));
    console.log("");
    this.FilterBookings(this.currentSearchText, 0, 0);
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

