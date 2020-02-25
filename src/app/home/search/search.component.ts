import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../bookings.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  fromTime = {hour: 0, minute: 0};
  fromSpinners = false;
  fromSize = "small";
  toTime = {hour: 23, minute: 59};
  toSpinners = false;
  toSize = "small";

  searchText:string = "";

  constructor(private bookingsService : BookingsService) { }

  ngOnInit() {
  }

  filter () {
    this.bookingsService.FilterBookings(this.searchText, this.fromTime, this.toTime);
  }
}
