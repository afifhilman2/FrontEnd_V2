import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Router, ActivatedRoute} from "@angular/router";
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { AppService} from '../app.service';
import { DatePipe } from '@angular/common';
import {IMyDpOptions} from 'mydatepicker';


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

  d: Date = new Date();

  idParams:any;
  categoryTrip:any[];
  provinceTrip:any[];
  typeTrip:any[];
  idOpenTrip:any;
  idPrivateTrip:any;
  service:any;
  publish:any;
  fixed:any;
  days:any;
  night:any;
  idTrip:any;
  dateLength;

  myForm = this.fb.group({
    trip_name : '', 
    id_type_trip : '', 
    days : '',
    night : '', 
    date_trip : this.fb.array([]), 
    publish_price : '', 
    fixed_price : '', 
    service_fee : '', 
    quota_trip : '', 
    description : '', 
    notes_traveler : '', 
    notes_meeting_point :'',
    id_province :'',
    id_category : '', 
    id_facility : '', 
    id_status_trip : '',
    publish_price_group : '', 
    service_fee_group : '', 

  })


  trip = {
    photo_trip : ['../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png'],
    photo:[],
  }

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd mmm yyyy',
    sunHighlight: true,
    inline: false,
    disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate()+1},
    editableDateField: false,
    openSelectorOnInputClick: true,
};

  constructor( public router :Router, public fb:FormBuilder, private routeActive:ActivatedRoute, private appService: AppService, private http:Http, private datePipe:DatePipe ) 
  {
  

    // get categori trip
    this.appService.getCategoryTrip().subscribe( category => {
      this.categoryTrip = category.data;
     
    });

    // get province
    this.appService.getProvinceTrip().subscribe( province => {
      this.provinceTrip = province.data;
    });

    // get type trip
    this.appService.getTypeTrip().subscribe( type => {
      this.typeTrip = type.data;
      this.idPrivateTrip = type.data[1]._id;
      this.idOpenTrip = type.data[0]._id;
     
    });


    //params id
    let id = this.routeActive.snapshot.params['id'];
    this.idParams = id;
   }

   counter(i:Number) {
    return new Array(i);
  }

   // content2

  toggleJual():void {
    this.content1 = !this.content1;
    this.content2 = !this.content2;
  }

  createAuthorizationHeader (headers:Headers) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
}

onSubmitTrip() {

  // console.log(this.myForm.value);
  let headers = new Headers();
        
  this.createAuthorizationHeader (headers);
  return this.http.put('http://travinesia.com:3000/v1/provider/edit_trip/'+ this.idParams, this.myForm.value,
  {headers: headers})
  .subscribe(
    (res:Response)=> {
      let nullTrip = res.json();

      console.log(nullTrip);
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


  ngOnInit() {
  
    return this.http.get('http://travinesia.com:3000/get/detail_trip/'+ this.idParams,)
    .subscribe(
      (res:Response)=> {

        let ubahTrip = res.json();        

          this.myForm.patchValue({
            trip_name: ubahTrip.data.trip_name,
            id_type_trip: ubahTrip.data.id_type_trip,
            days: ubahTrip.data.days,
            publish_price : ubahTrip.data.publish_price, 
            quota_trip : ubahTrip.data.quota_trip, 
            description : ubahTrip.data.description, 
            notes_traveler : ubahTrip.data.notes_traveler, 
            notes_meeting_point : ubahTrip.data.notes_meeting_point,
            id_province : ubahTrip.data.id_province,
            id_category : ubahTrip.data.category[0], 
            id_facility : ubahTrip.data.facility, 
            time: ubahTrip.data.time,
            zone_time: ubahTrip.data.zone_time, 
            publish_price_group : [], 
            service_fee_group : [], 
            photo:[],
            fixed_price_grorup : [],
            photo_trip :[], 
          })

            let dateGroup = ubahTrip.data.date_trip.map (date_trip => this.fb.control(date_trip));
            this.myForm.setControl('date_trip', this.fb.array(dateGroup));

            console.log(this.myForm.value);

          // this.myForm.controls['date_trip'] = this.fb.array(ubahTrip.data.date_trip.map(date_trip => this.fb.control(date_trip)));

          // for (let i=0; i< this.myForm.value.date_trip.length; i++) {

          //   this.myForm.value.date_trip[i] = this.datePipe.transform(this.myForm.value.date_trip[i], 'yyyy-MM-dd');
          // }
          // console.log(this.myForm.value.date_trip);

        this.trip.photo_trip[0] = ubahTrip.data.photo_trip[0];
        this.trip.photo_trip[1] = ubahTrip.data.photo_trip[1];
        this.trip.photo_trip[2] = ubahTrip.data.photo_trip[2];
        this.trip.photo_trip[3] = ubahTrip.data.photo_trip[3];
        this.trip.photo_trip[4] = ubahTrip.data.photo_trip[4];

      }
    )
  
    }

}
