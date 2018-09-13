import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Router, ActivatedRoute} from "@angular/router";
import { AppService} from '../app.service';
import { DatePipe } from '@angular/common';


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
  idTrip:any;


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
    id_province :'',
    id_category : [], 
    id_facility : '', 
    id_status_trip : '',
    publish_price_group : '', 
    service_fee_group : '', 
    photo_trip : ['../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png'],
    photo:[],
    fixed_price_grorup : '', 
  }

  constructor( public router :Router, private routeActive:ActivatedRoute, private appService: AppService, private http:Http, private datePipe:DatePipe ) {
   
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

   onSubmitEditTrip() {


    this.trip.photo_trip[2] = this.trip.photo[2];

    console.log(this.trip);
        let headers = new Headers();
        
        this.createAuthorizationHeader (headers);
        return this.http.put('http://travinesia.com:3000/v1/provider/edit_trip/'+ this.idParams, this.trip,
        {headers: headers})
        .subscribe(
          (res:Response)=> {
            let nullTrip = res.json();

          

            // console.log(nullTrip);
            if(nullTrip.status == 200) {
              this.successedTrip = true;
              this.content1 = !this.content1;
              this.content2 = !this.content2;
        
             }
          }
        )

        
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
            this.trip.photo[0]=btoa(binaryString);
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
       this.trip.photo[1]=btoa(binaryString);
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
       this.trip.photo[2]=btoa(binaryString);
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
         this.trip.photo[3]=btoa(binaryString);
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
           this.trip.photo[4]=btoa(binaryString);
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
        this.trip.id_province = e.target.value;
       
      }

      onRadioType(event :any) {
        this.trip.id_type_trip = event.target.value; 
        
      }

  ngOnInit() {
  
    return this.http.get('http://travinesia.com:3000/get/detail_trip/'+ this.idParams,
  
  )
    .subscribe(
      (res:Response)=> {
        let ubahTrip = res.json();
      
        this.trip.photo_trip[0] = ubahTrip.data.photo_trip[0];
        this.trip.photo_trip[1] = ubahTrip.data.photo_trip[1];
        this.trip.photo_trip[2] = ubahTrip.data.photo_trip[2];
        this.trip.photo_trip[3] = ubahTrip.data.photo_trip[3];
        this.trip.photo_trip[4] = ubahTrip.data.photo_trip[4];

        this.trip.trip_name = ubahTrip.data.trip_name;
       
        this.trip.id_type_trip = ubahTrip.data.id_type_trip;
        this.trip.date_trip[0] = this.datePipe.transform(ubahTrip.data.date_trip[0], 'yyyy-MM-dd'); 
        this.trip.date_trip[1] = this.datePipe.transform(ubahTrip.data.date_trip[1], 'yyyy-MM-dd');
        this.trip.date_trip[2] = this.datePipe.transform(ubahTrip.data.date_trip[2], 'yyyy-MM-dd');
        this.trip.date_trip[3] = this.datePipe.transform(ubahTrip.data.date_trip[3], 'yyyy-MM-dd');
        this.trip.date_trip[4] = this.datePipe.transform(ubahTrip.data.date_trip[4], 'yyyy-MM-dd');
       
        this.trip.id_category = ubahTrip.data.id_category;
        // this.trip.id_category = ubahTrip.data.id_category;
        // this.trip.id_category[2] = ubahTrip.data.id_category[2];
        // this.trip.id_category[3] = ubahTrip.data.id_category[3];
        // this.trip.id_category[4] = ubahTrip.data.id_category[4];
        this.trip.days = ubahTrip.data.days;
        this.trip.id_province = ubahTrip.data.id_province_trip;
        this.trip.description = ubahTrip.data.description;
        this.trip.notes_meeting_point = ubahTrip.data.notes_meeting_point;
        this.trip.notes_traveler = ubahTrip.data.notes_traveler;
        this.trip.publish_price = ubahTrip.data.publish_price;
        this.trip.quota_trip = ubahTrip.data.quota_trip;  
       
      }
    )
  
    }

}
