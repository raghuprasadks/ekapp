import { Component, OnInit } from '@angular/core';
import {loginService} from '../../services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(login : loginService) { 
    console.log('Logout');
    login.logout();
  }

  ngOnInit(): void {
    
  }

}
