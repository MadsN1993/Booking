import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../bookings.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  fromTime = {hour: 13, minute: 30};
  fromSpinners = false;
  fromSize = "small";
  toTime = {hour: 14, minute: 30};
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
