import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {RegistrationService} from './services/Registration.service';
import { LoginComponent } from './components/login/login.component';
import {loginService} from './services/login.service';
import { MemberComponent } from './components/member/member.component';
import { RegistereduserComponent } from './components/registereduser/registereduser.component';
import {registereduserService} from './services/registereduser.service';
import { MycoursesComponent } from './components/mycourses/mycourses.component';
import { LogoutComponent } from './components/logout/logout.component';
import { BasicauthInterceptor } from './guards/basicauth.interceptor';
import { ErrorInterceptor } from './guards/error.interceptor';
import { MycoursevideosComponent } from './components/mycoursevideos/mycoursevideos.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    MemberComponent,
    RegistereduserComponent,
    MycoursesComponent,
    LogoutComponent,
    MycoursevideosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [RegistrationService,loginService,registereduserService,{ provide: HTTP_INTERCEPTORS, useClass: BasicauthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
