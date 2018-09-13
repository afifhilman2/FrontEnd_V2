import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Router, ActivatedRoute} from "@angular/router";
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms'
import { AppService} from '../app.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-salin-trip',
  templateUrl: './salin-trip.component.html',
  styleUrls: ['./salin-trip.component.css']
})
export class SalinTripComponent implements OnInit {
  successedTrip:boolean = false;
  content1:boolean = true;
  content2:boolean = false;

  idParams:any;
  categoryTrip:any[];
  provinceTrip:any[];
  typeTrip:any[];
  facilityTrip:any[];
  service:any;
  publish:any;
  fixed:any;
  days:any;
  night:any;
  idTrip:any;
  idTypeOpen:any;
  idTypePrivate:any;
  jam:any;
  menit:any;

  myForm:FormGroup;
  formFacility:FormGroup;

  trip = {
    trip_name : '', 
    id_type_trip : '', 
    days : '',
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
    time:'10:20',
    min_qty_group:[],
    latitude:'',
    longitude:'',
    publish_price_group : '', 
    service_fee_group : '', 
    photo_trip : ['../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png'],
    photo:[],
    fixed_price_grorup : '', 
  }

  constructor( public router :Router, private routeActive:ActivatedRoute, public fb:FormBuilder, private appService: AppService, private http:Http, private datePipe:DatePipe ) { 
    // get categori trip
    this.appService.getCategoryTrip().subscribe( category => {
      this.categoryTrip = category.data;
     
    });

    // get province
    this.appService.getProvinceTrip().subscribe( province => {
      this.provinceTrip = province.data;
     
    });

    // get type

    this.appService.getTypeTrip().subscribe( type => {
      this.typeTrip = type.data;
      this.idTypeOpen = this.typeTrip[0]._id;
      this.idTypePrivate = this.typeTrip[1]._id;
     
    });

    this.appService.getFacilityTrip().subscribe( facility => {
      this.facilityTrip = facility.data;
      // console.log(this.facilityTrip);
     
    });

    //params id
    let id = this.routeActive.snapshot.params['id'];
    this.idParams = id;
    
   }
   
   // content2

   toggleJual():void {
    this.content1 = !this.content1;
    this.content2 = !this.content2;
  }

  // createAuthorizationHeader (headers:Headers) {
  //   headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //     }


   onSubmitSalinTrip() {

    this.trip.description = this.trip.description.replace(/\n/g, "<br>");
    this.trip.notes_traveler = this.trip.notes_traveler.replace(/\n/g, "<br>");
    this.trip.notes_meeting_point = this.trip.notes_meeting_point.replace(/\n/g, "<br>");
    // this.trip.time = this.jam + ":" + this.menit;

    this.publish = this.trip.publish_price;
    this.service = (5 * this.publish) / 100;
    this.trip.service_fee = this.service
    this.fixed = this.publish - this.service;
    this.trip.fixed_price = this.fixed;
    console.log(this.trip)
    
    this.appService.addTripProvider(this.trip).subscribe(trip => {
   
      console.log(trip); 
   
   if(trip.status == 200) {
    this.router.navigate(['/JualTrip/DaftarTrip']);
      
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

    this.myForm = this.fb.group({
      category_id:this.fb.array([])
  });

    this.formFacility = this.fb.group({
      facility_id:this.fb.array([])
  });
  
    return this.http.get('http://travinesia.com:3000/get/trip_detail/'+ this.idParams,
  )
    .subscribe(
      (res:Response)=> {
        let ubahTrip = res.json();
        // console.log(this.trip);
      
        this.trip.photo_trip[0] = ubahTrip.data.photo_trip[0];
        this.trip.photo_trip[1] = ubahTrip.data.photo_trip[1];
        this.trip.photo_trip[2] = ubahTrip.data.photo_trip[2];
        this.trip.photo_trip[3] = ubahTrip.data.photo_trip[3];
        this.trip.photo_trip[4] = ubahTrip.data.photo_trip[4];

        this.trip.trip_name = ubahTrip.data.trip_name;
        this.trip.zone_time = ubahTrip.data.zone_time;
       
        this.trip.id_type_trip = ubahTrip.data.id_type_trip._id;
        this.trip.date_trip[0] = this.datePipe.transform(ubahTrip.data.date_trip[0], 'yyyy-MM-dd'); 
        this.trip.date_trip[1] = this.datePipe.transform(ubahTrip.data.date_trip[1], 'yyyy-MM-dd');
        this.trip.date_trip[2] = this.datePipe.transform(ubahTrip.data.date_trip[2], 'yyyy-MM-dd');
        this.trip.date_trip[3] = this.datePipe.transform(ubahTrip.data.date_trip[3], 'yyyy-MM-dd');
        this.trip.date_trip[4] = this.datePipe.transform(ubahTrip.data.date_trip[4], 'yyyy-MM-dd');
       
        this.trip.id_category = ubahTrip.data.category[0]._id;
        // this.trip.id_category = ubahTrip.data.id_category;
        // this.trip.id_category[2] = ubahTrip.data.id_category[2];
        // this.trip.id_category[3] = ubahTrip.data.id_category[3];
        // this.trip.id_category[4] = ubahTrip.data.id_category[4];
        this.trip.days = ubahTrip.data.days;
        this.trip.id_province_trip = ubahTrip.data.id_province._id;
        this.trip.description = ubahTrip.data.description.replace(/<br\s*\/?>/mg, "\n" );;
        this.trip.notes_meeting_point = ubahTrip.data.notes_meeting_point.replace(/<br\s*\/?>/mg, "\n" );;
        this.trip.notes_traveler = ubahTrip.data.notes_traveler.replace(/<br\s*\/?>/mg, "\n" );;
        
        this.trip.publish_price = ubahTrip.data.publish_price;
        this.trip.quota_trip = ubahTrip.data.quota_trip;  
       
      }
    )
  
    }

    checked(e,i) {
      const categoryArray = <FormArray>this.myForm.controls.category_id; 

      if(e.target.checked) {
        categoryArray.push(new FormControl(i));
      }
      else  {
        let index = categoryArray.controls.findIndex(x=> x.value == i)
        categoryArray.removeAt(index);
      }

      this.trip.id_category = this.myForm.value.category_id;
      // console.log(this.trip.id_category);
    }

    checkedFacility(e,i){
      const categoryArray = <FormArray>this.formFacility.controls.facility_id; 

      if(e.target.checked) {
        categoryArray.push(new FormControl(i));
      }
      else  {
        let index = categoryArray.controls.findIndex(x=> x.value == i)
        categoryArray.removeAt(index);
      }

      this.trip.id_facility = this.formFacility.value.facility_id;
      // console.log(this.trip.id_facility);

    }

}
