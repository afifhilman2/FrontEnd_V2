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
  showSpinner: boolean = true;
  subcribe = Subscription;
  load;
  
  constructor(private router: Router, private appService: AppService) { 
    this.load = this.appService.getDataTrip().subscribe (dataTrip => {
     
      this.dataTrip = dataTrip.data;
      // console.log(dataTrip);
      this.photo = dataTrip.data.photo_trip
      // console.log(this.photo)
    });

    this.appService.getProvinceTrip().subscribe (province => {
      this.profinsi = province.data;
    });

    this.appService.getCategoryTrip().subscribe ( kategori =>{
      this.category = kategori.data
      // console.log(this.category)
    })
  }

  goLogin(){
    this.router.navigate(['login']);
  }

  ngOnInit() {
    // this.load.subcribe(() => this.showSpinner = false)
  }

  goDetail(e){
    this.idDetail = e.target.id;
    console.log(localStorage.token)
    if(!(localStorage.token == null)){
        // console.log('login')
      this.router.navigate(['traveler/DetailPaket', this.idDetail]);
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
