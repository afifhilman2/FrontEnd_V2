import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AppService} from '../app.service';

import {IMyDpOptions, IMyDateModel} from 'mydatepicker';

import { Subscription } from 'rxjs/Subscription';


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
  d = new Date();
  type_trip;
  search:any = {
    id_category:'',
    id_provinsi : '',
    id_type_trip:'',
    days: '',
    date: '',
    quantity:''
  }
  // {date : {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate()+2} }
  constructor(private router: Router, private appService: AppService) { 
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
      // console.log(this.category)
    })

    this.appService.getTypeTrip().subscribe(data=>{
      this.type_trip = data.data;
      console.log(this.type_trip);
    })

    var os = this.getMobileOperationSystem();
    if(os == 'Android' || os == 'Windows Phone' || os == 'iOS'){
      console.log("Bener")
      window.location.href = 'https://m.travinesia.com'
    }
  }


  public myDatePickerOptions: IMyDpOptions = {
      
    dateFormat: 'dd mmm yyyy',
    sunHighlight: true,
    inline: false,
    disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate()-1},
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
  getDiskon(){
    this.appService.getDiscountTrip().subscribe(diskon =>{
      this.diskon = diskon.data;
      
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
    console.log(this.favorite.id_trip)
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
    
    // console.log(this.search.id_category)
    // console.log(this.search.id_provinsi)
    // console.log(this.search.date)
    // console.log(this.search.days)
    // console.log(this.search.id_type_trip)
    // console.log(this.search.quantity)
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
    this.router.navigate(['/Diskon'],{queryParams:{flag_search: 4}});
  }

}
