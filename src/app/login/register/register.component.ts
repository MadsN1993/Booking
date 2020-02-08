import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private Authentication: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  regUser = {};

  registerUser(event) {
    var result = this.Authentication.regNewUser(this.regUser);
    if (result) {
      this.router.navigate(['/']);
    } else {
      window.alert("You cannot register this user");
    }

  }
}
