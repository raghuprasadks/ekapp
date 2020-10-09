import { Component, OnInit } from '@angular/core';
import {registereduser} from '../../models/registereduser'
import {registereduserService} from '../../services/registereduser.service'

@Component({
  selector: 'app-registereduser',
  templateUrl: './registereduser.component.html',
  styleUrls: ['./registereduser.component.css']
})
export class RegistereduserComponent implements OnInit {
  posts: registereduser[];
  currentPost: registereduser = {
    id:0,
    name:'',
    description:'',
    videourl:'',
    status:''
  }
  
  constructor(private postService: registereduserService) { }

  ngOnInit() {  
    this.postService.getPosts().subscribe(posts => {
    //console.log("crash course");
    //console.log("type of ",posts);
    var postsample = posts[0];
    //console.log(typeof(postsample))
    //console.log(posts[0]);

      this.posts = posts;

      for (let i=0;i<this.posts.length;i++)
      {
        console.log('elements ',this.posts[i])
      }
    });
  }

}
