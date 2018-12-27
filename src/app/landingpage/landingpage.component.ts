import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AppService} from '../app.service';

import {IMyDpOptions, IMyDateModel} from 'mydatepicker';

import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  idDetail:any[];
  dataTrip;
  profinsi:any[];
  category:any[];
  photo:[ '../assets/img/user.png']

  catego;
  profin;
  subcribe = Subscription;
  loaded : boolean = true;
  formatDate = new Date();
  type_trip;
  search:any = {
    id_category:'',
    id_provinsi : '',
    id_type_trip:'',
    days: '',
    date: '',
    quantity:''
  }

  starEmpty= "https://img.travinesia.com/iconweb/icon card trip_bintang kosong.png"
  star = "https://img.travinesia.com/icon/ikon card trip_bintang_16x16.png"
  trip_star: boolean[] = [false,false,false,false,false];
  rating

  dataPromo;
  // {date : {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate()+2} }
  constructor(private router: Router, private appService: AppService, private toastr: ToastrService) { 
    // this.loaded = true;
    this.appService.getDataTrip().subscribe (dataTrip => {
      this.dataTrip = dataTrip.data;
      this.photo = dataTrip.data.photo_trip
      this.loaded = false;
    });


    this.appService.getProvinceTrip().subscribe (province => {
      this.profinsi = province.data;
    });


    this.appService.getCategoryTrip().subscribe ( kategori =>{
      this.category = kategori.data
    })

    this.appService.getTypeTrip().subscribe(data=>{
      this.type_trip = data.data;
    })

    var os = this.getMobileOperationSystem();
    if(os == 'Android' || os == 'Windows Phone' || os == 'iOS'){
      window.location.href = 'https://m.travinesia.com'
    }

    this.appService.getAllPromo().subscribe(promo =>{
      this.dataPromo = promo.data;
      // console.log(this.dataPromo)
    })
  }


  public myDatePickerOptions: IMyDpOptions = {
      
    dateFormat: 'dd mmm yyyy',
    sunHighlight: true,
    inline: false,
    disableUntil: {year: this.formatDate.getFullYear(), month: this.formatDate.getMonth() + 1, day: this.formatDate.getDate()-1},
    editableDateField: false,
    openSelectorOnInputClick: true,
  };

  dateValue(event: IMyDateModel){
    this.search.date = event.jsdate;
  }

  getMobileOperationSystem(){
    var userAgent = navigator.userAgent;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent)) {
        return "iOS";
    }

    return "unknown";
  }

  diskon;
  discount_trip: number[] = [];
  getDiskon(){
    this.appService.getDiscountTrip().subscribe(diskon =>{
      this.diskon = diskon.data;
      // console.log(diskon.data)
      // console.log(this.diskon.discount_date)
      // console.log(this.diskon)
      // if(diskon.data.flag_discount){
        for(var i = 0 ; i < this.diskon.length ; i++ ){
          for(var j = 0 ; j < this.diskon[i].discount_date.length ; j++){
            if(this.discount_trip[i]!=0 && this.diskon[i].discount_date[j]!=0){
              this.discount_trip[i] = this.diskon[i].discount_date[j];
            }
            else if(this.diskon[i].discount_date[j] > this.discount_trip[i]){
              this.discount_trip[i] = this.diskon[i].discount_date[j];
            }
          }
        }
        if(diskon.data.rate_div!=0){
          this.rating = Math.floor(diskon.data.rate_total/diskon.data.rate_div);
          for(var i = 0; i < this.rating; i++){
            this.trip_star[i] = !this.trip_star[i];
          }
        }
      // }
      // console.log(diskon)
    })
  }

  goLogin(){
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.getDiskon()
    // this.load.subcribe(() => this.showSpinner = false)
  }

  favorite = { 
    id_trip:''
  }
  change;
  favorit(id){
    this.favorite.id_trip = id;
    this.appService.addFavorit(this.favorite).subscribe(dataFavorite =>{
      if(sessionStorage.token != null){
        // if(dataFavorite.data.flag_favorite = true){
      //   this.change = true
      // }
      } else{
        this.router.navigate(['/LoginPage'])
      }
    })
  }

  goToDetail(id){
    this.router.navigate(['/DetailPaket', id])
  }

  getprovinsi(e){
    this.search.id_provinsi = e.target.value;
    
  }

  getcategory(e){
    this.search.id_category = e.target.value;
  }

  getType(e){
    this.search.id_type_trip = e.target.value;
  }
  goToSearch(){
    this.router.navigate(['/search'], {queryParams: {keyword: JSON.stringify(this.search),flag_search: 3}})
  }

  getDays(e){
    this.search.days = e.target.value;
  }

  counter(i: number) {
    return new Array(i);
  }

  counterStars(i: number){
    return Array(Math.round(i)).fill(4);
  }

  goDiskon(){
    this.router.navigate(['/search'],{queryParams:{flag_search: 4}});
  }

  gototerm(){
    this.toastr.warning('Masih Dalam Pengembangan')
  }

}
