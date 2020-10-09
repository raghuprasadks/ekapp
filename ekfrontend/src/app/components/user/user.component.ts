import { Component, OnInit } from '@angular/core';
import {Registration} from '../../models/Registration'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // Properties
  user: Registration;

  // Methods
  constructor() {
    
  } 

  ngOnInit() {
  }
}
