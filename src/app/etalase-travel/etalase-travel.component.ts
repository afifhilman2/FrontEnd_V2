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

  constructor(private appService:AppService, public activeRoute:ActivatedRoute, public route:Router) {

    let id = this.activeRoute.snapshot.params['id']
    this.appService.getEtalseProvider(id).subscribe(etalase => {

      this.etalaseProvider = etalase.provider[0].provider;
      this.tripProvider = etalase.provider;
      console.log(this.tripProvider);
    })
   }

   counter(i: number) {
    return Array(Math.round(i)).fill(4);
  }

  // goDetail(e){
  //   let id = e
  //   console.log(id);
  //   this.route.navigate(['/traveler/DetailPaket/' + id])
  // }

  ngOnInit() {
  }

}
