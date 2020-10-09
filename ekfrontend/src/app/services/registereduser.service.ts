import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {registereduser} from '../models/registereduser';
import {MyCourses} from '../models/mycourses';
import {MyCourseVideos} from '../models/mycoursevideos';
import { from } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  

  @Injectable()
export class registereduserService {
  Url: string = 'http://localhost:5000/api/';

  
  constructor(private http: HttpClient) { }

  getPosts() : Observable<registereduser[]> {
    console.log("url"+ this.http.get<registereduser[]>(this.Url+"getCrashCourse"));
    return this.http.get<registereduser[]>(this.Url+"getCrashCourse");
  }

  getMyCourses():Observable<MyCourses[]> {
    var email = localStorage.getItem("user");
    console.log("Email " +email);
    //let url = this.Url+"getMyCourses"+email;
    return this.http.get<MyCourses[]>(this.Url+"getMyCourses?email="+email);
  }

  getMyCourseVideos(id):Observable<MyCourseVideos[]>{
    console.log('getMyCourseVideos',id);
    var email = localStorage.getItem("user");
    return this.http.get<MyCourseVideos[]>(this.Url+"getMyCourseVideos?email="+email+"&courseid="+id);
  }

}

  