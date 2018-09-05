import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { filter } from 'rxjs/operators';
// import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { BrowserModule } from "@angular/platform-browser";

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

  opentrip:boolean = true;
  privatetrip:boolean = false;

  categoryTrip:any[];
  provinceTrip:any[];
  typeTrip:any[];
  facilityTrip:any[];
  service:any;
  publish:any;
  fixed:any;
  days:any;
  idTypeOpen:any;
  idTypePrivate:any;

  // var jual trip
  trip = {
    trip_name : '', 
    id_type_trip : '', 
    days : this.days,
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
    id_facility : [], 
    zone_time:'',
    time:'',
    min_qty_group:[],
    latitude:'',
    longitude:'',
    publish_price_group : [], 
    service_fee_group : [], 
    photo_trip : [],
    photo : ['../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png'],
    fixed_price_grorup : [], 
  }

  constructor( public router :Router, private appService: AppService ) {
    this.appService.getCategoryTrip().subscribe( category => {
      this.categoryTrip = category.data;
      // console.log(this.categoryTrip);
     
    });

    this.appService.getProvinceTrip().subscribe( province => {
      this.provinceTrip = province.data;
      // console.log(this.provinceTrip);
     
    });

    this.appService.getTypeTrip().subscribe( type => {
      this.typeTrip = type.data;
      this.idTypeOpen = this.typeTrip[0]._id;
      this.idTypePrivate = this.typeTrip[1]._id;
     
    });

    this.appService.getFacilityTrip().subscribe( facility => {
      this.facilityTrip = facility.data;
      // console.log(this.facilityTrip);
     
    });

   }

    // content2

    toggleJual():void {
      this.content1 = !this.content1;
      this.content2 = !this.content2;
    }
  
    //toggle open private 
  
    openclick():void {
      this.opentrip = true;
      this.privatetrip= false;
    }
  
    privateclick():void {
      this.opentrip = false;
      this.privatetrip= true;
    }

    // submit jual trip

   onSubmitTrip1() {

        this.publish = this.trip.publish_price;
        this.service = (5 * this.publish) / 100;
        this.trip.service_fee = this.service
        this.fixed = this.publish - this.service;
        this.trip.fixed_price = this.fixed;
        this.appService.addTripProvider(this.trip).subscribe(trip => {
       
          console.log(trip); 
       
       if(trip.status == 200) {
         this.successedTrip = true;
         this.content1 = !this.content1;
         this.content2 = !this.content2;
          
       }

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
            this.trip.photo_trip[0]= btoa(binaryString); 
            this.trip.photo[0]="data:image/jpeg;base64,"+ btoa(binaryString);       
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
       this.trip.photo_trip[1]= btoa(binaryString); 
       this.trip.photo[1]="data:image/jpeg;base64,"+ btoa(binaryString);         
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
       this.trip.photo_trip[2]= btoa(binaryString); 
       this.trip.photo[2]="data:image/jpeg;base64,"+ btoa(binaryString);          
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
         this.trip.photo_trip[3]= btoa(binaryString); 
         this.trip.photo[3]="data:image/jpeg;base64,"+ btoa(binaryString);          
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
           this.trip.photo_trip[4]= btoa(binaryString); 
           this.trip.photo[4]="data:image/jpeg;base64,"+ btoa(binaryString);         
          }

          // end upload image


      // event value

      onSelectDuration(e) {
        this.days = e.target.value;
        this.trip.days = parseInt(this.days);
        
      }

      onSelectCategory(e) {
        this.trip.id_category[0] = e.target.value;
       
      }

      onSelectProvince(e) {
        this.trip.id_province_trip = e.target.value;
       
      }

      onRadioType(event :any) {
        this.trip.id_type_trip = event.target.value; 
        
      }

      checked(e) {
        if(e.target.checked) {
          this.trip.id_facility = e.target.value;
          console.log(this.trip.id_facility);
        }
        
      }

    //   filterItemsOfType(type) {
    //     return this.facilityTrip.filter(x => x.facility_category == type);
    // }

  ngOnInit() {
  
    }

}
