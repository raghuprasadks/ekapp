import { Component, OnInit } from '@angular/core';

import {registereduserService} from '../../services/registereduser.service';
import {MyCourses} from '../../models/mycourses';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})
export class MycoursesComponent implements OnInit {
  mycourses:MyCourses[];
  constructor(private regUser:registereduserService,private router: Router) { }

  ngOnInit(): void {

     this.regUser.getMyCourses().subscribe(data=>{
      this.mycourses=data;
      console.log('mycourses '+this.mycourses)

    });

  }

  getCourseVideos(id):void{

    console.log('Course video id',id);
    this.router.navigate(['admin', 'books'], { queryParams: { id, action: 'view' } });

  }

}
