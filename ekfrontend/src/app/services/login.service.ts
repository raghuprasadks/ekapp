import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

import {login} from '../models/login';
import {User} from '../models/user';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable()
export class loginService {
  
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  Url: string = 'http://localhost:5000/api';

  constructor(private http: HttpClient,private router: Router) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
  }
/**
  registerUser(regUser: login): Observable<login> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    console.log("RegisterUser :" + regUser);
    return this.http.post<login>(this.Url+'/login' ,regUser, httpOptions);
  }  */

  public get userValue(): User {
    return this.userSubject.value;
}

  login(email: string, password: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    console.log('login :email '+email);
    console.log("password");
    console.log(password);
    console.log("password");
    return this.http.post<any>(this.Url+'/login', { "email":email, "password":password },httpOptions)
        .pipe(map(user => {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            console.log('Login Service :user '+user.name);
            console.log('Login Service :user[0] -name'+user[0].name);
            user=user[0];
            console.log('user ',user);
            user.authdata = window.btoa(name + ':' + password);
            localStorage.setItem('user', JSON.stringify(user.email));
            //this.userSubject.next(user);
            return user;
        }));
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  this.userSubject.next(null);
  this.router.navigate(['/login']);
}

}