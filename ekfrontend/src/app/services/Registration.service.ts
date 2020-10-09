import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

import {Registration} from '../models/Registration'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable()
export class RegistrationService {
  Url: string = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { 
  }
    registerUser(regUser: Registration): Observable<Registration> {  
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
      console.log("RegisterUser :" + regUser);
      return this.http.post<Registration>(this.Url+'/register' ,regUser, httpOptions);
    }
  }