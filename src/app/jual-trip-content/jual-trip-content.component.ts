import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AppService} from '../app.service';

@Component({
  selector: 'app-jual-trip-content',
  templateUrl: './jual-trip-content.component.html',
  styleUrls: ['./jual-trip-content.component.css']
})
export class JualTripContentComponent implements OnInit {

  successedTrip:boolean = false;
  content1:boolean = true;
  content2:boolean = false;

  toggleJual():void {
    this.content1 = !this.content1;
    this.content2 = !this.content2;
  }

  categoryTrip:any[];
  provinceTrip:any[];
  typeTrip:any[];

  trip = {
    trip_name : '', 
    id_type_trip : '', 
    days : '',
    night : '', 
    date_trip : '', 
    publish_price : '', 
    fixed_price : '', 
    service_fee : '', 
    quota_trip : '', 
    description : '', 
    notes_traveler : '', 
    id_category : '', 
    id_facility : '', 
    id_status_trip : '', 
    publish_price_group : '', 
    service_fee_group : '', 
    fixed_price_grorup : '', 
    photo_trip : ''
  }

  constructor(private router: Router, private appService: AppService ) {
    this.appService.getCategoryTrip().subscribe( category => {
      this.categoryTrip = category.data;
     
    });

    this.appService.getProvinceTrip().subscribe( province => {
      this.provinceTrip = province.data;
      console.log(province);
    })
   }

   onSubmitTrip1() {
     this.appService.addTripProvider(this.trip).subscribe(trip => {
       console.log(trip);

     })
   }

  ngOnInit() {
  }

}
