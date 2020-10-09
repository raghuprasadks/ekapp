import { Component, OnInit } from '@angular/core';
import {registereduserService} from '../../services/registereduser.service';
import {MyCourseVideos} from '../../models/mycoursevideos';
@Component({
  selector: 'app-mycoursevideos',
  templateUrl: './mycoursevideos.component.html',
  styleUrls: ['./mycoursevideos.component.css']
})
export class MycoursevideosComponent implements OnInit {
  myCourseVideos:MyCourseVideos[];
  constructor(private registereduserService:registereduserService) { }

  ngOnInit(): void {
    console.log("ngOnInit")
    this.getMyCourseVideos("1");
  }

  getMyCourseVideos(id):void{

    this.registereduserService.getMyCourseVideos(id).subscribe((data)=>{
      console.log('my course video',data);
      this.myCourseVideos=data;
    });


  }

}
