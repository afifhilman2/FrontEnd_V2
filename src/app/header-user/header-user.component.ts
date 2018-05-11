import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {


  profile:any =[];
  provider:any=[];
  query:any;

  changeHead:boolean = true;
  changeHeadUser:boolean = false;

  querySearch(e) {
    this.query= e.target.value;
    console.log(this.query);
  }
  



  constructor(public appService: AppService) {
    this.appService.getUsers().subscribe(profile => {
      
    });

    this.appService.getProvider().subscribe(provider => {
      console.log(provider);
    });
   
   }

   logout() {
    localStorage.removeItem('token');   
  }


  ngOnInit() {


    

  }

}
