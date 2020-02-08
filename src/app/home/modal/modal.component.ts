import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../../booking'
import { BookingsService } from '../bookings.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterViewInit {

  // https://stackoverflow.com/questions/45027331/angular2-how-to-trigger-click-event-without-clicking
  @ViewChild('myDiv', { static: false }) myDiv: ElementRef<HTMLElement>;
  @ViewChild('myDiv2', { static: false }) myDiv2: ElementRef<HTMLElement>;

  
  constructor(
    private modalService: NgbModal,
    private bookingService: BookingsService
  ) { }

  booking: Booking;

  ngOnInit() {
  }

  // openN(content2) {
  //   this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {

  //     switch (result) {
  //       case "Cancel": {
  //         console.log("Cancel")
  //         break;
  //       }
  //       case "Add": {
  //         this.bookingService.AddBooking(this.booking);
  //         break;
  //       }
  //       default: {
  //         console.log(result);
  //         break;
  //       }
  //     }

  //     //Metode 1
  //     // console.log(result);
  //   }, (reason) => {
  //     console.log(reason);
  //     console.log("reason");
  //   });
  // };


  // open(content) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {

  //     switch (result) {
  //       case "Delete": {
  //         this.bookingService.DeleteBooking(this.booking);
  //         break;
  //       }
  //       case "Cancel": {
  //         console.log("Cancel")
  //         break;
  //       }
  //       case "Edit": {
  //         this.bookingService.EditBooking(this.booking);
  //         break;
  //       }
  //       default: {
  //         console.log(result);
  //         break;
  //       }
  //     }

      //Metode 1
      // console.log(result);
  //   }, (reason) => {
  //     console.log(reason);
  //     console.log("reason");
  //   });
  // };


  // receiveMessage($event) {
  //   console.log($event.Date)
  //   this.booking = $event;
  //   this.myDiv.nativeElement.click();
  // }

  // receiveMessage($event) {

  //   if ($event === undefined) {
  //     this.booking = new Booking();
  //     this.booking.Id =  this.bookingService.GetId();
  //     this.myDiv2.nativeElement.click();

  //   }
  //   else {
  //     this.booking = new Booking();
  //     this.booking.Id = $event.Id;
  //     this.booking.Name = $event.Name;
  //     this.booking.Telephone = $event.Telephone;
  //     this.booking.Email = $event.Email;
  //     this.booking.Guests = $event.Guests;
  //     // this.booking.Date = $event.Date;
  //     this.booking.Duration = $event.Duration;
  //     this.booking.Outside = $event.Outside;
  //     this.myDiv.nativeElement.click();
  //   }
  
  // }



  ngAfterViewInit() {
    // this.booking = new Booking();
    // console.log(this.myDiv);
  }

}
