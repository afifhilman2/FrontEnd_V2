import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AppService} from '../app.service';

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
  
  constructor(private router: Router, private appService: AppService) { 
    // this.loaded = true;
    this.appService.getDataTrip().subscribe (dataTrip => {
     
      this.dataTrip = dataTrip.data;
      // console.log(dataTrip);
      this.photo = dataTrip.data.photo_trip
      // console.log(this.photo)

      this.loaded = false;
    });

    this.appService.getProvinceTrip().subscribe (province => {
      this.profinsi = province.data;
    });

    this.appService.getCategoryTrip().subscribe ( kategori =>{
      this.category = kategori.data
      // console.log(this.category)
    })

    var os = this.getMobileOperationSystem();
    if(os == 'Android' || os == 'Windows Phone' || os == 'iOS'){
      console.log("Bener")
      window.location.href = 'https://m.travinesia.com'
    }
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
      if(dataFavorite.data.flag_favorite = true){
        this.change = true
      }
      console.log(dataFavorite)
    })
  }

  goToDetail(id){
    this.router.navigate(['/DetailPaket', id])
  }

  getprovinsi(e){
    this.profin = e.target.value;
    
  }

  getcategory(e){
    this.catego = e.target.value;
  }

  goToSearch(){
    this.catego;
    
    // console.log(this.catego);
    this.profin;
    // console.log(this.profin);
    this.router.navigate(['/searchBar/', this.catego, this.profin])
  }

  counterStars(i: number){
    return Array(Math.round(i)).fill(4);
  }

  goCalendar(){
    this.router.navigate(['/Diskon']);
  }

}
