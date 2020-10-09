import { Component, OnInit,ViewChild } from '@angular/core';
import {Registration} from '../../models/Registration';
import {RegistrationService} from '../../services/Registration.service'
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  alert:boolean=true;
  user: Registration = {
    name: '',
    mobilenumber:'',
    email: '',
    password: ''
  }
  users: Registration[];
  showExtended: boolean = true;
  loaded: boolean = false;
  enableAdd: boolean = false;
  showUserForm: boolean = false;
  @ViewChild('userForm') form: any;
  data: any;
  constructor(
    private userService: RegistrationService) {
   }

  ngOnInit() :void {}
  
  
  onSubmit({value}: {value: Registration}) {
      if(!isNullOrUndefined(value))
      {
          this.userService.registerUser(value).subscribe(user => {
           this.user.name = value.name;
           console.log("RegisterUser1 :" + this.user.name);
           this.user.mobilenumber = value.mobilenumber;
           console.log("RegisterUser2 :" + this.user.mobilenumber);
           this.user.email = value.email;
           this.user.password = value.password;
           this.form.reset();
           this.alert=true;
          });
          
      }
      else {
        console.log("value not defined");
        this.alert=false;
      }
    }
    }
  
  
