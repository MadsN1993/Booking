import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './login/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private _authService : AuthenticationService,
    private _router : Router) { }
  
    canActivate() : boolean {
    if (this._authService.loggedIn()) {
      return localStorage.getItem('token') == "admin";
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
  
}
