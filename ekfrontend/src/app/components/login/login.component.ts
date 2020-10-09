import { Component, OnInit,ViewChild } from '@angular/core';
import { login } from 'src/app/models/login';
import {loginService} from '../../services/login.service'
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: login = {
    email: '',
    password:''
  }
  users: login[];
  showExtended: boolean = true;
  loaded: boolean = false;
  enableAdd: boolean = false;
  showUserForm: boolean = false;
  alert:boolean=false;
  @ViewChild('userForm') form: any;
  data: any;
  error = '';
  constructor(private logservice : loginService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit({value}: {value: login}) {
    console.log('OnSubmit:: ',value.email);
    console.log('OnSubmit:: ',value.password);
    
        this.logservice.login(value.email, value.password)
       // .pipe(first())
        .subscribe(
            data => {

              console.log('data : '+data);
                this.router.navigate(['/registereduser']);
            },
            error => {
              console.log('Error::')
                this.error = error;
                
            });
}
  /**
  onSubmit({value}: {value: login}) {
    
    if(!isNullOrUndefined(value))
    {
        this.logservice.registerUser(value).subscribe(user => {
         this.user.email = value.email;
         console.log("Loginemail:" + this.user.email);
         this.user.password = value.password;
         console.log("Loginepassword:" + this.user.password);
         console.log("overalldata:"+ value);
         
         this.form.reset();
        });
        console.log(value);
        this.alert=true;
        this.router.navigate(['/registereduser']);
    }
    else {
      console.log("value not defined");
    }
  }

   */
  }

