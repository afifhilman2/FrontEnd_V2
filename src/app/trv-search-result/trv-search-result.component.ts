import { Component, Input, OnInit} from '@angular/core';
import { AppService } from '../app.service';
import { Http, Response } from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import { Router, CanActivate,ActivatedRoute } from '@angular/router';
import { DataService} from '../data.service';
import 'rxjs/add/operator/filter';
// import { FilterPipe } from './filter.pipe'

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
  public data: any[] = [];

  private filters: ((data: any[]) => any[])[] = [];


  notFound: boolean = false;
  constructor ( private routeActive :ActivatedRoute, private appService:AppService, public http:Http, private router: Router) { 


  //  this.categoryId = id;
  //   console.log(this.categoryId);
  }

  dataSearchCategory : any[] = [];
  dataSearchName;
  titleSearch;
  discount_trip: number[] = [];
  ngOnInit() {
      
    let flag_search = this.routeActive.snapshot.queryParams['flag_search'];
    // console.log(flag_search)
    
    if (flag_search == 1){
      let keywords = this.routeActive.snapshot.queryParams['keyword'];
      this.appService.getSearchTrip(keywords).subscribe(results_trip => {
        // console.log(results_trip)
        if(results_trip.status == 200){
          this.dataSearchCategory = results_trip.data;
          for(let i = 0; i<this.dataSearchCategory.length ; i++){
            this.titleSearch = this.dataSearchCategory[i].trip_name;
          }

          for(var i = 0 ; i < this.dataSearchCategory.length ; i++ ){
            for(var j = 0 ; j < this.dataSearchCategory[i].discount_date.length ; j++){
              if(this.discount_trip[i]!=0 && this.dataSearchCategory[i].discount_date[j]!=0){
                this.discount_trip[i] = this.dataSearchCategory[i].discount_date[j];
              }
              else if(this.dataSearchCategory[i].discount_date[j] > this.discount_trip[i]){
                this.discount_trip[i] = this.dataSearchCategory[i].discount_date[j];
              }
            }
          }
        } else if(results_trip == 404){
          this.notFound = true;
        }
        
      })
    }else if (flag_search == 2){
      let keywords = this.routeActive.snapshot.queryParams['keyword'];
      this.appService.searchCategory(keywords).subscribe(results_trip => {
        // console.log(results_trip)
        
        if(results_trip.status == 200){
          this.dataSearchCategory = results_trip.data;
          for(let i = 0; i<this.dataSearchCategory.length ; i++){
            this.titleSearch = this.dataSearchCategory[i].category[0].category_name;
            
          }
          for(var i = 0 ; i < this.dataSearchCategory.length ; i++ ){
            for(var j = 0 ; j < this.dataSearchCategory[i].discount_date.length ; j++){
              if(this.discount_trip[i]!=0 && this.dataSearchCategory[i].discount_date[j]!=0){
                this.discount_trip[i] = this.dataSearchCategory[i].discount_date[j];
                // console.log(this.discount_trip[i])
              }
              else if(this.dataSearchCategory[i].discount_date[j] > this.discount_trip[i]){
                this.discount_trip[i] = this.dataSearchCategory[i].discount_date[j];
                // console.log(this.discount_trip[i])
              }
            }
          }
        }else if(results_trip.status == 404){
          this.notFound = true;
        }
        
      })
    }
    else if (flag_search == 3){
      let keywords = JSON.parse(this.routeActive.snapshot.queryParams['keyword']);
      // console.log(keywords)
      this.titleSearch = ('Hasil Pencarian')
      this.appService.getSearchAdvanceTrip(keywords).subscribe(results_trip => {
        // console.log(results_trip)
        if(results_trip.status == 200 && keywords != null ){
          this.dataSearchCategory = results_trip.data;
          for(var i = 0 ; i < this.dataSearchCategory.length ; i++ ){
            for(var j = 0 ; j < this.dataSearchCategory[i].discount_date.length ; j++){
              if(this.discount_trip[i]!=0 && this.dataSearchCategory[i].discount_date[j]!=0){
                this.discount_trip[i] = this.dataSearchCategory[i].discount_date[j];
              }
              else if(this.dataSearchCategory[i].discount_date[j] > this.discount_trip[i]){
                this.discount_trip[i] = this.dataSearchCategory[i].discount_date[j];
              }
            }
          }
        }else if(results_trip.status == 404){
          this.notFound = true;
        }
      })
    }
    else if(flag_search == 4){
      this.appService.getAllDiscountTrip().subscribe(results_trip => {
        // console.log(results_trip)
        this.titleSearch = ('Diskon')
        if(results_trip.status == 200){
          this.dataSearchCategory = results_trip.data;
          for(var i = 0 ; i < this.dataSearchCategory.length ; i++ ){
            for(var j = 0 ; j < this.dataSearchCategory[i].discount_date.length ; j++){
              if(this.discount_trip[i]!=0 && this.dataSearchCategory[i].discount_date[j]!=0){
                this.discount_trip[i] = this.dataSearchCategory[i].discount_date[j];
              }
              else if(this.dataSearchCategory[i].discount_date[j] > this.discount_trip[i]){
                this.discount_trip[i] = this.dataSearchCategory[i].discount_date[j];
              }
            }
          }
        }else if(results_trip.status == 404){
          this.notFound = true;
        }
        
      })
    }
  }

  favorite = { 
    id_trip:''
  }
  change: boolean = false;
  favorit(id){
    this.favorite.id_trip = id;
    this.appService.addFavorit(this.favorite).subscribe(dataFavorite =>{
      // console.log(dataFavorite)
    })
  }

  id_trip;
  goToDetail(id){
    this.router.navigate(['/DetailPaket', id])
  }

  counterStars(i: number){
    return Array(Math.round(i)).fill(4);
  }

  check
  checked(e){
    this.check = e.target.checked;
    return this.dataSearchCategory.filter(item => {
      let dataFilter = e.target.value;
      // console.log(item)
    })

    // console.log(this.filter)
  }
}
