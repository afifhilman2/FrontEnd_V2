import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-etalase-travel',
  templateUrl: './etalase-travel.component.html',
  styleUrls: ['./etalase-travel.component.css']
})


export class EtalaseTravelComponent implements OnInit {

  etalaseProvider:any[];
  tripProvider:any[];

  constructor(private appService:AppService, public activeRoute:ActivatedRoute) {

    let id = this.activeRoute.snapshot.params['id']
    this.appService.getEtalseProvider(id).subscribe(etalase => {

      this.etalaseProvider = etalase.provider;
      this.tripProvider = etalase.provider.trips;
      console.log(this.etalaseProvider);
    })
   }

  ngOnInit() {
  }

}
