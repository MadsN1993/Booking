import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Booking } from '../../booking'
import { BookingsService } from '../bookings.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {

  previousTableHover: number;
  bookings: Booking[] = [];
  booking: Booking;
  bookingHover: Booking;

  @Output() messageEvent = new EventEmitter<Booking>();

  constructor(
    private bookingService: BookingsService,
    private modalService: NgbModal
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

  mouseover(booking, e) {
    let trId = e.toElement.parentElement.id;
    document.getElementById(trId).style.backgroundColor = "#23272B";

    this.bookingHover = booking;
  }

  mouseout(e) {
    let trId = e.fromElement.parentElement.id;
    document.getElementById(trId).style.backgroundColor = "#343A40";

    this.bookingHover = null;
  }

  onTableHover(tableNumber: number) {

    if ((this.bookings !== undefined && this.bookings.length > 0)) {
      if (tableNumber === null) {

        this.bookings.forEach(booking => {
          if (booking.TableNumber === this.previousTableHover) {

            document.getElementById(`r${this.previousTableHover}`).style.backgroundColor = "#343A40";

          }

        });


        // Sæt til rigtige farve den som har forkert farve
      }
      else {

        this.bookings.forEach(booking => {

          if (booking.TableNumber === tableNumber) {
            this.previousTableHover = tableNumber;
            document.getElementById(`r${tableNumber}`).style.backgroundColor = "#23272B";
          }

        });
      }

    }



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
