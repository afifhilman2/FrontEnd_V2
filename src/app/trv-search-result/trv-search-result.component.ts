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

  

  dataSearchCategory;
  dataSearchName;
  ngOnInit() {
      
    let flag_search = this.routeActive.snapshot.queryParams['flag_search'];
    if (flag_search == 1){
      let keywords = this.routeActive.snapshot.queryParams['keyword'];
      this.appService.getSearchTrip(keywords).subscribe(results_trip => {
        // console.log(results_trip)
        this.dataSearchCategory = results_trip.data;
      })
    }
    else if (flag_search == 2){
      let keywords = this.routeActive.snapshot.queryParams['keyword'];
      // console.log(keywords)
      this.appService.searchCategory(keywords).subscribe(results_trip => {
        // console.log(results_trip)
        this.dataSearchCategory = results_trip.data;
      })
    }
    else if (flag_search == 3){
      let keywords = JSON.parse(this.routeActive.snapshot.queryParams['keyword']);
      // console.log(keywords)
      this.appService.getSearchAdvanceTrip(keywords).subscribe(results_trip => {
        // console.log(results_trip)
        this.dataSearchCategory = results_trip.data;
      })
    }
    else if(flag_search == 4){
      this.appService.getAllDiscountTrip().subscribe(results_trip => {
        this.dataSearchCategory = results_trip.data;
      })
    }


    this.routeActive.queryParams.filter(params => params.order).subscribe(params => {
      //  console.log(params);

      this.order = params.order;
      // console.log(this.order);
    });
  }

  favorite = { 
    id_trip:''
  }
  change: boolean = false;
  favorit(id){
    this.favorite.id_trip = id;
    // console.log(this.favorite.id_trip)
    this.appService.addFavorit(this.favorite).subscribe(dataFavorite =>{
      // if(dataFavorite.data.flag_favorite = true){
      //   this.change = !this.change;
      // }
      console.log(dataFavorite)
    })
  }

  id_trip;
  goToDetail(id){
    this.router.navigate(['/DetailPaket', id])
  }
}
