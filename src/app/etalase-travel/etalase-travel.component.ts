import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-etalase-travel',
  templateUrl: './etalase-travel.component.html',
  styleUrls: ['./etalase-travel.component.css']
})


export class EtalaseTravelComponent implements OnInit {

  tripProvider:any[];

  constructor(private appService:AppService) {
    this.appService.getTripProvider().subscribe(tripProvider => {
      //console.log(tripProvider);
    })
   }

  ngOnInit() {
  }

}
