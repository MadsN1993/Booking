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
import { SetupComponent } from './setup/setup/setup.component';
import { ToolbarComponent } from './setup/toolbar/toolbar.component';
import { DragAndDropComponent } from './setup/drag-and-drop/drag-and-drop.component';
import { LoginComponent } from './login//login/login.component';
import { RegisterComponent } from './login//register//register.component';
import { AuthenticationService } from './login/authentication.service';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BookingsService}  from './home/bookings.service';


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
    ModalComponent,
    SetupComponent,
    ToolbarComponent,
    DragAndDropComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [AuthenticationService, AuthGuard, BookingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
