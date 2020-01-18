import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { InfoComponent } from './home/info/info.component';
import { SearchComponent } from './home/search/search.component';
import { FilteringComponent } from './home/filtering/filtering.component';
import { TableOverviewComponent } from './home/table-overview/table-overview.component';
import { ReservationComponent } from './home/reservation/reservation.component';
import { ModalComponent } from './home/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    InfoComponent,
    SearchComponent,
    FilteringComponent,
    TableOverviewComponent,
    ReservationComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
