import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Http, Response } from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import { Router, CanActivate } from '@angular/router';
import { DataService} from '../data.service';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-trv-search-result',
  templateUrl: './trv-search-result.component.html',
  styleUrls: ['./trv-search-result.component.css']
})
export class TrvSearchResultComponent implements OnInit {

  order:string;

  categoryAllTripId:any[];

  constructor(private routeActive : ActivatedRoute, public appService:AppService, public http:Http) { 

  }



  ngOnInit() {
    this.routeActive.queryParams.filter(params => params.order).subscribe(params => {
      //  console.log(params);

      this.order = params.order;
      // console.log(this.order);
    });
  }
}
