import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginComponent} from './components/login/login.component';
import {RegistereduserComponent} from './components/registereduser/registereduser.component';
import {MycoursesComponent} from './components/mycourses/mycourses.component';
import {LogoutComponent} from './components/logout/logout.component';
import {AuthGuard} from './guards/auth.guard';
import {MycoursevideosComponent} from './components/mycoursevideos/mycoursevideos.component'
import { from } from 'rxjs';
const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registereduser', component:RegistereduserComponent}, 
  {path: 'mycourses', component:MycoursesComponent},
  {path:'logout',component:LogoutComponent},
  {path:'myCourseVideos',component:MycoursevideosComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
