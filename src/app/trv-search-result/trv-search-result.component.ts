import { Component, Input, OnInit} from '@angular/core';
import { AppService } from '../app.service';
import { Http, Response } from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import { Router, CanActivate,ActivatedRoute } from '@angular/router';
import { DataService} from '../data.service';
import 'rxjs/add/operator/filter';
import { ToastrService } from 'ngx-toastr';
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

  profinsi;
  category;
  type_trip;
 
  limit = 5;
  idfavorit: boolean = false;

  notFound: boolean = false;
  constructor (private toastr:ToastrService, private routeActive :ActivatedRoute, private appService:AppService, public http:Http, private router: Router) { 
    
    this.appService.getProvinceTrip().subscribe (province => {
      this.profinsi = province.data;
    });


    this.appService.getCategoryTrip().subscribe ( kategori =>{
      this.category = kategori.data

    })

    this.appService.getTypeTrip().subscribe(data=>{
      this.type_trip = data.data;
    })

  //  this.categoryId = id;
  //   console.log(this.categoryId);
  if(sessionStorage.token != null){
    //   // if(dataFavorite.data.flag_favorite = true){
      this.idfavorit = true
    }
  }

  showMore(){
    this.limit = this.category.length
  }

  showLess(){
    this.limit = 5
  }

  dataSearchCategory : any[] = [];
  dataSearchName;
  titleSearch;
  discount_trip: number[] = [];
  rating;
  trip_star: boolean[] = [false,false,false,false,false];
  starEmpty= "https://img.travinesia.com/iconweb/icon card trip_bintang kosong.png"
  star = "https://img.travinesia.com/icon/ikon card trip_bintang_16x16.png"

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

          if(results_trip.data.rate_div!=0){
            this.rating = Math.floor(results_trip.data.rate_total/results_trip.data.rate_div);
            for(var i = 0; i < this.rating; i++){
              this.trip_star[i] = !this.trip_star[i];
            }
          }

        } else if(results_trip.status == 404){
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

          if(results_trip.data.rate_div!=0){
            this.rating = Math.floor(results_trip.data.rate_total/results_trip.data.rate_div);
            for(var i = 0; i < this.rating; i++){
              this.trip_star[i] = !this.trip_star[i];
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

          if(results_trip.data.rate_div!=0){
            this.rating = Math.floor(results_trip.data.rate_total/results_trip.data.rate_div);
            for(var i = 0; i < this.rating; i++){
              this.trip_star[i] = !this.trip_star[i];
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

          if(results_trip.data.rate_div!=0){
            this.rating = Math.floor(results_trip.data.rate_total/results_trip.data.rate_div);
            for(var i = 0; i < this.rating; i++){
              this.trip_star[i] = !this.trip_star[i];
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
      if(dataFavorite.status == 200){
        this.toastr.success('Trip berhasil difavoritkan')
      }
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

  
  gototerm(){
    this.toastr.warning('Masih Dalam Pengembangan')
  }

  goDiskon(){
    this.router.navigate(['/search'],{queryParams:{flag_search: 4}});
  }
  
}
