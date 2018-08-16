import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AppService } from '../app.service';
import { Http } from '@angular/http';


@Component({
  selector: 'app-jual-trip',
  templateUrl: './jual-trip.component.html',
  styleUrls: ['./jual-trip.component.css']
})
export class JualTripComponent implements OnInit {

  order: string;
  order2: string;

  loaded:boolean = true;


  profileProvider = {
    nameTrip :'',
    cover:'',
    photo:'',
  }

  constructor(private routeActive : ActivatedRoute, public appService:AppService, private http:Http) { 
    this.appService.getProvider().subscribe(profile => {

      if(profile.success == false) {

        alert('Belum Login ');
      }

      // console.log(profile);
      this.profileProvider.nameTrip = profile.provider.travel_name;
      this.profileProvider.cover = profile.provider.cover;
     // this.profileProvider.photo = profile.provider.photo;
      
    //  this.loaded = false;
    })

    
  }

  ngOnInit() {
    this.routeActive.queryParams.filter(params => params.order).subscribe(params => {
      // console.log(params); {order: "popular"}

      this.order = params.order;
     // console.log(this.order);  popular
    });
  }

}
