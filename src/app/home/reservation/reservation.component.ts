import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Booking } from '../../booking'
import { BookingsService } from '../bookings.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit  {
  
  test : string = "Fra reservationComponent"
  bookings: Booking[] = [];
  booking: Booking;


  @Output() messageEvent = new EventEmitter<Booking>();

  constructor(
    private bookingService: BookingsService,
    private modalService : NgbModal
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







  openN(content2) {
    this.booking = new Booking();
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {
      
      switch (result) {
        case "Cancel": {
          console.log("Cancel")
          break;
        }
        case "Add": {
          this.bookingService.AddBooking(this.booking);
          break;
        }
        default: {
          console.log(result);
          break;
        }
      }
    }, (reason) => {
      console.log(reason);
      console.log("reason");
    });
  };


  open(booking, content) {
    this.booking = booking;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {

      switch (result) {
        case "Delete": {
          this.bookingService.DeleteBooking(this.booking);
          break;
        }
        case "Cancel": {
          console.log("Cancel")
          break;
        }
        case "Edit": {
          this.bookingService.EditBooking(this.booking);
          break;
        }
        default: {
          console.log(result);
          break;
        }
      }
    }, (reason) => {
      console.log(reason);
      console.log("reason");
    });
  };



}
