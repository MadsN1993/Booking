import { Injectable } from '@angular/core';
import { User } from '../User';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private _router : Router) { }

  users : User[] = [
    {
      username : "test",
      password : "test"
    }, {
      username : "admin",
      password : "admin",
    } 

  ]

  getUserDetails(username, password) {
    //Should be validated through http call to server
    let userExists : Boolean = false; 
    this.users.forEach(function (user) {
      if (user.username == username && user.password == password) {
        userExists = true; 
        localStorage.setItem('token', username);
      }
    });
    return userExists;
  }

  regNewUser(userData) {
    let userExists : Boolean = false;
    this.users.forEach(function (user) {
      if (user.username == userData.username) {
        userExists = true; 
      }
    });
    if (!userExists) {
      this.users.push({
        username : userData.username,
        password : userData.password
     });
     localStorage.setItem('token', userData.username);
    }
    return !userExists;
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
