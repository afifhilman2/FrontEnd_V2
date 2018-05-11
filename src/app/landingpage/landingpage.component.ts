import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AppService} from '../app.service';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {


  dataTrip:any[];
  
  constructor(private router: Router, private appService: AppService) { 
    this.appService.getDataTrip().subscribe (dataTrip => {
     
      this.dataTrip = dataTrip.data;
    });
  }

  goLogin(){
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }

}
