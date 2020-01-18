import { Component, OnInit } from '@angular/core';
import { Booking } from '../../booking'
import { BookingsService } from '../bookings.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  bookings : Booking[] = [];

  constructor(
    private bookingService : BookingsService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.bookings = this.bookingService.GetBookings();
  }
  

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' , size : "lg"});
  }



  OpenBooking(booking : Booking, content){
    this.open(content);
  }

}
