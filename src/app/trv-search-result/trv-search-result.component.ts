import { Component, Input, OnInit} from '@angular/core';
import { AppService } from '../app.service';
import { Http, Response } from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import { Router, CanActivate,ActivatedRoute } from '@angular/router';
import { DataService} from '../data.service';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-trv-search-result',
  templateUrl: './trv-search-result.component.html',
  styleUrls: ['./trv-search-result.component.css']
})
export class TrvSearchResultComponent implements OnInit {

  order:string;
  public categoryId;
  getTripSearch:any[];

  categoryAllTripId:any[];

  constructor (private routeActive :ActivatedRoute, private appService:AppService, public http:Http, private router: Router) { 

  //   let id = this.routeActive.snapshot.params['id'];
  //   console.log(this.routeActive);

  //  this.categoryId = id;
  //   console.log(this.categoryId);
  }

  

  dataSearch;
  ngOnInit() {
    
      // this.http.get('http://travinesia.com:3000/get/category/'+this.categoryId)
      // .subscribe(
      //   (res:Response)=> {
      //     let tripSearch = res.json();
      //     this.getTripSearch = tripSearch.data;
      //    console.log(this.getTripSearch);
      //   }
      // )
      this.dataSearch = JSON.parse(this.routeActive.snapshot.queryParams['data'])
      console.log(this.dataSearch)
 

    this.routeActive.queryParams.filter(params => params.order).subscribe(params => {
      //  console.log(params);

      this.order = params.order;
      // console.log(this.order);
    });
  }
}
