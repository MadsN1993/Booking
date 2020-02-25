import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { SetupComponent } from './setup/setup/setup.component'
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { AuthGuard } from './auth.guard';
import { AdminGuardGuard } from './admin-guard.guard';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    canActivate : [AuthGuard] 
  },
  { 
    path: 'setup', 
    component: SetupComponent,
    canActivate : [AuthGuard, AdminGuardGuard] 
  },
  { path: 'login', 
    component: LoginComponent,
  },
  { path: 'register', 
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
