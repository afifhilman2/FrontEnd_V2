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
      console.log(dataTrip);
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
  }

  getDiskon(){
    this.appService.getDiscountTrip().subscribe(diskon =>{
      console.log(diskon)
    })
  }

  goLogin(){
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.getDiskon()
    // this.load.subcribe(() => this.showSpinner = false)
  }

  goDetail(e){
    this.idDetail = e.target.id;
    if(!(localStorage.token == null)){
        // console.log('login')
      this.router.navigate(['/DetailPaket', this.idDetail]);
    }else{
      // console.log('belom login')
      this.router.navigate(['/DetailPaket', this.idDetail]);
    }
       
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

}
