import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Router, ActivatedRoute} from "@angular/router";
import { AppService} from '../app.service';


@Injectable ()
@Component({
  selector: 'app-jual-trip-content2',
  templateUrl: './jual-trip-content2.component.html',
  styleUrls: ['./jual-trip-content2.component.css']
})
export class JualTripContent2Component implements OnInit {

  successedTrip:boolean = false;
  content1:boolean = true;
  content2:boolean = false;

  // content2

  toggleJual():void {
    this.content1 = !this.content1;
    this.content2 = !this.content2;
  }

  createAuthorizationHeader (headers:Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
}
  idParams:any;
  categoryTrip:any[];
  provinceTrip:any[];
  typeTrip:any[];
  service:any;
  publish:any;
  fixed:any;
  days:any;
  night:any;


  trip = {
    trip_name : '', 
    id_type_trip : '', 
    days : '',
    night : '', 
    date_trip : [], 
    publish_price : '', 
    fixed_price : '', 
    service_fee : '', 
    quota_trip : '', 
    description : '', 
    notes_traveler : '', 
    notes_meeting_point :'',
    id_province_trip :'',
    id_category : [], 
    id_facility : '', 
    id_status_trip : '',
    publish_price_group : '', 
    service_fee_group : '', 
    photo_trip : ['../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png'],
    fixed_price_grorup : '', 
  }

  constructor( public router :Router, private routeActive:ActivatedRoute, private appService: AppService, private http:Http ) {
   
    // get categori trip
    this.appService.getCategoryTrip().subscribe( category => {
      this.categoryTrip = category.data;
     
    });

    // get province
    this.appService.getProvinceTrip().subscribe( province => {
      this.provinceTrip = province.data;
     
    });

    //params id
    let id = this.routeActive.snapshot.params['id'];
    this.idParams = id;

    
   }


   onSubmitTrip1() {

        this.publish = this.trip.publish_price;
        this.service = (5 * this.publish) / 100;
        this.trip.service_fee = this.service
        this.fixed = this.publish - this.service;
        this.trip.fixed_price = this.fixed;
     this.appService.addTripProvider(this.trip).subscribe(trip => {
       console.log(trip); 

     })
   }


   //upload image

   uploadImage1(evt) {
    let files = evt.target.files;
      let file = files[0];
    
    if (files && file) {
        let reader = new FileReader();

        reader.onload =this._handleReaderLoaded1.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded1(readerEvt) {
     let binaryString = readerEvt.target.result; 
            this.trip.photo_trip[0]="data:image/jpeg;base64,"+ btoa(binaryString);       
    }

    uploadImage2(evt) {
      let files = evt.target.files;
        let file = files[0];
      
      if (files && file) {
          let reader = new FileReader();
  
          reader.onload =this._handleReaderLoaded2.bind(this);
  
          reader.readAsBinaryString(file);
      }
    }
    
    _handleReaderLoaded2(readerEvt) {
       let binaryString = readerEvt.target.result;
       this.trip.photo_trip[1]="data:image/jpeg;base64,"+ btoa(binaryString);         
      }

      uploadImage3(evt) {
      let files = evt.target.files;
        let file = files[0];
      
      if (files && file) {
          let reader = new FileReader();
  
          reader.onload =this._handleReaderLoaded3.bind(this);
  
          reader.readAsBinaryString(file);
      }
    }
    
    _handleReaderLoaded3(readerEvt) {
       let binaryString = readerEvt.target.result;
       this.trip.photo_trip[2]="data:image/jpeg;base64,"+ btoa(binaryString);          
      }

      uploadImage4(evt) {
        let files = evt.target.files;
          let file = files[0];
        
        if (files && file) {
            let reader = new FileReader();
    
            reader.onload =this._handleReaderLoaded4.bind(this);
    
            reader.readAsBinaryString(file);
        }
      }
      
      _handleReaderLoaded4(readerEvt) {
         let binaryString = readerEvt.target.result;
         this.trip.photo_trip[3]="data:image/jpeg;base64,"+ btoa(binaryString);          
        }

        uploadImage5(evt) {
          let files = evt.target.files;
            let file = files[0];
          
          if (files && file) {
              let reader = new FileReader();
      
              reader.onload =this._handleReaderLoaded5.bind(this);
      
              reader.readAsBinaryString(file);
          }
        }
        
        _handleReaderLoaded5(readerEvt) {
           let binaryString = readerEvt.target.result;
           this.trip.photo_trip[4]="data:image/jpeg;base64,"+ btoa(binaryString);         
          }

          // end upload image


      onSelectDuration(e) {
        this.trip.days = e.target.value;
        this.days = this.trip.days;
        this.night = this.days - 1;
        this.trip.night = this.night;
        
      }

      onSelectCategory(e) {
        this.trip.id_category = e.target.value;
       
      }

      onSelectProvince(e) {
        this.trip.id_province_trip = e.target.value;
       
      }

      onRadioType(event :any) {
        this.trip.id_type_trip = event.target.value; 
        
      }

  ngOnInit() {
    // let headers = new Headers();
    
    // this.createAuthorizationHeader (headers);
    return this.http.get('http://travinesia.com:3000/get/detail_trip/'+ this.idParams,
    // {headers: headers}
  )
    .subscribe(
      (res:Response)=> {
        let ubahTrip = res.json();
        console.log(ubahTrip);

        this.trip.trip_name = ubahTrip.data.trip_name;
        this.trip.id_type_trip = ubahTrip.data.id_type_trip;
        this.trip.date_trip = ubahTrip.data.date_trip;
        console.log(this.trip.trip_name);
      
       
      }
    )
  
    }

}
