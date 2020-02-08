import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Authentication: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault(); 
    const target = event.target; 
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;
    var result = this.Authentication.getUserDetails(username, password);
    if (result) {
      this.router.navigate(['/']);
    } else {
      window.alert("Wrong user or password");
    }
  }
}
