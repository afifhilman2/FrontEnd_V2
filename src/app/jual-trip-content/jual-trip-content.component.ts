import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

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

  // content2

  toggleJual():void {
    this.content1 = !this.content1;
    this.content2 = !this.content2;
  }

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
    category : [], 
    id_facility : '', 
    id_status_trip : '',
    publish_price_group : '', 
    service_fee_group : '', 
    photo_trip : ['../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png'],
    photo : [],
    fixed_price_grorup : '', 
  }

  constructor( public router :Router, private appService: AppService ) {
    this.appService.getCategoryTrip().subscribe( category => {
      this.categoryTrip = category.data;
     
    });

    this.appService.getProvinceTrip().subscribe( province => {
      this.provinceTrip = province.data;
     
    })
   }

   onSubmitTrip1() {

        this.publish = this.trip.publish_price;
        this.service = (5 * this.publish) / 100;
        this.trip.service_fee = this.service
        this.fixed = this.publish - this.service;
        this.trip.fixed_price = this.fixed;
        
        // this.trip.photo_trip[0]= this.trip.photo[0];     
        // this.trip.photo_trip[1]= this.trip.photo[1];
        // this.trip.photo_trip[2]= this.trip.photo[2];
        // this.trip.photo_trip[3]= this.trip.photo[3];
        // this.trip.photo_trip[4]= this.trip.photo[4];

        if(this.trip.photo_trip[0] != '') {
          this.trip.photo_trip[0]= this.trip.photo[0];
        }

        console.log(this.trip.photo_trip[0]); 

        // if(this.trip.photo_trip[1] != '') {
        //   this.trip.photo_trip[1]= this.trip.photo[1];
        // }

        // if(this.trip.photo_trip[2] != '') {
        //   this.trip.photo_trip[2]= this.trip.photo[2];
        // }

        // if(this.trip.photo_trip[2] != '') {
        //   this.trip.photo_trip[3]= this.trip.photo[3];
        // }

        // if(this.trip.photo_trip[4] != '') {
        //   this.trip.photo_trip[4]= this.trip.photo[4];
        // }

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
            this.trip.photo[0]= btoa(binaryString); 
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
       this.trip.photo[1]= btoa(binaryString); 
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
       this.trip.photo[2]= btoa(binaryString); 
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
         this.trip.photo[3]= btoa(binaryString); 
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
           this.trip.photo[4]= btoa(binaryString); 
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
        this.trip.category[0] = e.target.value;
        console.log(this.trip.category);
       
      }

      onSelectProvince(e) {
        this.trip.id_province_trip = e.target.value;
       
      }

      onRadioType(event :any) {
        this.trip.id_type_trip = event.target.value; 
        
      }

  ngOnInit() {
  
    }

}
