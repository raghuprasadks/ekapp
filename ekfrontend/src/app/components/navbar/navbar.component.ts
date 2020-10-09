import { Component, OnInit } from '@angular/core';
import {loginService} from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  constructor(private loginService:loginService) { }

  ngOnInit(): void {
    console.log("login details :"+this.loginService.userValue);
    if (this.loginService.user)
      this.isLoggedIn= true;
  }

}
