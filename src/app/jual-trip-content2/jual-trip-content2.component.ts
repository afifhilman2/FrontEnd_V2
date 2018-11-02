import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Router, ActivatedRoute} from "@angular/router";
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { AppService} from '../app.service';
import { DatePipe } from '@angular/common';
import {IMyDpOptions} from 'mydatepicker';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable ()
@Component({
  selector: 'app-jual-trip-content2',
  templateUrl: './jual-trip-content2.component.html',
  styleUrls: ['./jual-trip-content2.component.css']
})
export class JualTripContent2Component implements OnInit {

  url = 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d6030.418742494061!2d-111.34563870463673!3d26.01036670629853!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1471908546569';

  lat;
  lng;

  successedTrip:boolean = false;
  content1:boolean = true;
  content2:boolean = false;
  value;
  opentrip:boolean = true;
  privatetrip:boolean = false;

  d: Date = new Date();

  idParams:any;
  categoryTrip:any[];
  provinceTrip:any[];
  typeTrip:any[];
  idOpenTrip:any;
  idPrivateTrip:any;
  facilityTrip:any[];
  service:any;
  publish:any;
  fixed:any;
  days:any;
  night:any;
  idTrip:any;
  dateLength;
  time;

  myForm = this.fb.group({
    trip_name : '', 
    id_type_trip : [{value: '', disabled: true}], 
    days : [{value: '', disabled: true}],
    night : '', 
    date_trip : this.fb.array([]), 
    publish_price : '', 
    fixed_price : '', 
    service_fee : '', 
    quota_trip : [{value: '', disabled: true}], 
    description : [{value: '', disabled: true}], 
    notes_traveler : '', 
    notes_meeting_point :'',
    id_province :[{value: '', disabled: true}],
    id_category : '', 
    id_facility : this.fb.array([]), 
    id_status_trip : '',
    time:'',
    photo_trip:this.fb.array([]),
    zone_time:[{value: '', disabled: true}],
    publish_price_group : this.fb.array(['','','','','']), 
    service_fee_group : '', 
    min_qty_group: this.fb.array(['','','','','']),
    latitude:'',
    longitude:'',

  })

  autoCompleteCallback1(selectedData:any) {
    console.log(selectedData);

    this.lat = selectedData.data.geometry.location.lat;
    this.lng = selectedData.data.geometry.location.lng;

    console.log(this.myForm.value.longitude);
    console.log(this.myForm.value.latitude);
    this.setURL(this.lat, this.lng)
     
    //do any necessery stuff.
}

setURL(lat,lng){
  this.url = 'https://maps.google.com/maps?q='+lat+','+lng+'&hl=es;z=14&amp&output=embed';

  return this.url;
}


  trip = {
    photo_trip : ['../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png'],
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

  constructor( public router :Router, public fb:FormBuilder, private routeActive:ActivatedRoute, private appService: AppService,  public sanitizer: DomSanitizer, private http:Http, private datePipe:DatePipe ) 
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

    this.appService.getFacilityTrip().subscribe( facility => {
      this.facilityTrip = facility.data;
      // console.log(this.facilityTrip);
     
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
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
}

onSubmitTrip() {

  console.log(this.myForm.value);

  this.appService.editPhotoTrip(this.idParams, this.myForm.value).subscribe( photo => {
  });

  let headers = new Headers();
        
  this.createAuthorizationHeader (headers);
  return this.http.put('https://travinesia.com:1210/v1/provider/edit_trip/'+ this.idParams, this.myForm.value,
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
            this.myForm.value.photo_trip[0]=btoa(binaryString);
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
       this.myForm.value.photo_trip[1]=btoa(binaryString);
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
       this.myForm.value.photo_trip[2]=btoa(binaryString);
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
         this.myForm.value.photo_trip[3]=btoa(binaryString);
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
           this.myForm.value.photo_trip[4]=btoa(binaryString);
           this.trip.photo_trip[4]="data:image/jpeg;base64,"+ btoa(binaryString);         
          }

          // end upload image

          checked(e,i) {
            const facilityArray = <FormArray>this.myForm.controls.id_facility; 
                    
            if(e.target.checked) {
              facilityArray.push(new FormControl(i));
              // console.log(facilityArray)
            }
            else  {
              let index = facilityArray.controls.findIndex(x=> x.value == i)
              facilityArray.removeAt(index);
              // console.log(facilityArray);
            }
        
          }

          keyPress(event: any) {
            const pattern = /[0-9]/;
        
            let inputChar = String.fromCharCode(event.charCode);
            if (event.keyCode != 8 && !pattern.test(inputChar)) {
              event.preventDefault();
            }
          }
        

  ngOnInit() {
  
    return this.http.get('https://travinesia.com:1210/get/detail_provider_trip/'+ this.idParams,)
    .subscribe(
      (res:Response)=> {

        let ubahTrip = res.json();        

        this.time = ubahTrip.data.time;
        this.lat = ubahTrip.data.latitude;
        this.lng = ubahTrip.data.longitude;
        this.url = 'https://maps.google.com/maps?q='+this.lat+','+this.lng+'&hl=es;z=14&amp&output=embed';

        console.log(ubahTrip.data)

          this.myForm.patchValue({
            trip_name: ubahTrip.data.trip_name,
            id_type_trip: ubahTrip.data.id_type_trip._id,
            days: ubahTrip.data.days,
            publish_price : ubahTrip.data.publish_price, 
            quota_trip : ubahTrip.data.quota_trip, 
            description : ubahTrip.data.description, 
            notes_traveler : ubahTrip.data.notes_traveler, 
            notes_meeting_point : ubahTrip.data.notes_meeting_point,
            id_province : ubahTrip.data.id_province._id,
            id_category : ubahTrip.data.category[0]._id, 
            time: ubahTrip.data.time,
            zone_time: ubahTrip.data.zone_time, 
            publish_price_group : [], 
            service_fee_group : [], 
            photo:[],
            fixed_price_grorup : [],
            photo_trip :[], 
          })

            this.trip.photo_trip[0] = ubahTrip.data.photo_trip[0];
            this.trip.photo_trip[1] = ubahTrip.data.photo_trip[1];
            this.trip.photo_trip[2] = ubahTrip.data.photo_trip[2];
            this.trip.photo_trip[3] = ubahTrip.data.photo_trip[3];
            this.trip.photo_trip[4] = ubahTrip.data.photo_trip[4];

            let dateGroup = ubahTrip.data.date_trip.map (date_trip => this.fb.control(date_trip));
            this.myForm.setControl('date_trip', this.fb.array(dateGroup));

            this.myForm.setControl('id_facility', this.fb.array(ubahTrip.data.facility || []));
            this.myForm.setControl('min_qty_group', this.fb.array(ubahTrip.data.min_qty_group || []));
            this.myForm.setControl('publish_price_group', this.fb.array(ubahTrip.data.publish_price_group || []));
            this.myForm.setControl('photo_trip', this.fb.array(ubahTrip.data.photo_trip || []));
            
            for(let i=0; i < this.facilityTrip.length; i++) {
              for(let j=0; j < this.myForm.value.id_facility.length; j++) {
                if( this.facilityTrip[i]._id == this.myForm.value.id_facility[j]) {
                  
                  this.facilityTrip[i].flag_facility = 1;
                }

              }
            }


          // private trip
          if(ubahTrip.data.id_type_trip._id == '5a85391c0ee623c4311ba6a4') {
            this.privatetrip = true;
            this.opentrip = false;
          }

      }
    )
  
    }

}
