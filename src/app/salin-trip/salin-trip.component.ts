import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Router, ActivatedRoute} from "@angular/router";
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { AppService} from '../app.service';
import { DatePipe } from '@angular/common';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-salin-trip',
  templateUrl: './salin-trip.component.html',
  styleUrls: ['./salin-trip.component.css']
})
export class SalinTripComponent implements OnInit {
  successedTrip:boolean = false;
  content1:boolean = true;
  content2:boolean = false;
  opentrip:boolean = true;
  privatetrip:boolean = false;

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
  facilityTrip:any[];

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
    id_province_trip :'',
    id_category : '', 
    id_facility : this.fb.array([]), 
    id_status_trip : '', 
    service_fee_group : '', 
    time:'',
    zone_time:'',
    publish_price_group : this.fb.array(['','','','','']), 
    min_qty_group: this.fb.array(['','','','','']),
    photo_trip :this.fb.array([]),

  })


  trip = {
    photo_trip : ['../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png'],
    // photo:[],
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

    // get facility
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
  this.appService.addTripProvider(this.myForm.value).subscribe(trip => {
       
    // console.log(trip); 

    if(trip.status == 200) {
      this.successedTrip = true;
      this.content1 = !this.content1;
      this.content2 = !this.content2;

      this.router.navigateByUrl('/free', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/JualTrip/DaftarTrip']));
       
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
    //  console.log(binaryString);
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
       this.myForm.value.photo_trip[0][1]=btoa(binaryString);
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
       this.myForm.value.photo_trip[0][2]=btoa(binaryString);
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
         this.myForm.value.photo_trip[0][3]=btoa(binaryString);
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
           this.myForm.value.photo_trip[0][4]=btoa(binaryString);
           this.trip.photo_trip[4]="data:image/jpeg;base64,"+ btoa(binaryString);         
          }

          // end upload image

      dateValue(event: IMyDateModel) {

        const dateArray = <FormArray>this.myForm.controls.date_trip;
        dateArray.push(new FormControl(event.jsdate));
      }

      keyPress(event: any) {
        const pattern = /[0-9]/;
    
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
      }

      getBase64ImageFromURL(url: string) {
        return Observable.create((observer: Observer<string>) => {
          let img = new Image();
          img.crossOrigin = 'Anonymous';
          img.src = url;
          if (!img.complete) {
            img.onload = () => {
              observer.next(this.getBase64Image(img));
              observer.complete();
            };
            img.onerror = (err) => {
              observer.error(err);
            };
          } else {
            observer.next(this.getBase64Image(img));
            observer.complete();
          }
        });
      }
    
      getBase64Image(img: HTMLImageElement) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      }


  ngOnInit() {
  
    return this.http.get('https://travinesia.com:1210/get/detail_provider_trip/'+ this.idParams,)
    .subscribe(
      (res:Response)=> {

        let ubahTrip = res.json();        

        // console.log(ubahTrip);

          this.myForm.patchValue({
            trip_name: ubahTrip.data.trip_name,
            id_type_trip: ubahTrip.data.id_type_trip._id,
            days: ubahTrip.data.days,
            publish_price : ubahTrip.data.publish_price, 
            quota_trip : ubahTrip.data.quota_trip, 
            description : ubahTrip.data.description, 
            notes_traveler : ubahTrip.data.notes_traveler, 
            notes_meeting_point : ubahTrip.data.notes_meeting_point,
            id_province_trip: ubahTrip.data.id_province._id,
            id_category : ubahTrip.data.category[0]._id, 
            // id_facility : ubahTrip.data.facility, 
            time: ubahTrip.data.time,
            zone_time: ubahTrip.data.zone_time, 
            // publish_price_group : [], 
            service_fee_group : [], 
            photo:[],
            fixed_price_grorup : [],
            // photo_trip :[], 
          })

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

            this.trip.photo_trip[0] = ubahTrip.data.photo_trip[0];
            this.trip.photo_trip[1] = ubahTrip.data.photo_trip[1];
            this.trip.photo_trip[2] = ubahTrip.data.photo_trip[2];
            this.trip.photo_trip[3] = ubahTrip.data.photo_trip[3];
            this.trip.photo_trip[4] = ubahTrip.data.photo_trip[4];

             // private trip
          if(ubahTrip.data.id_type_trip._id == '5a85391c0ee623c4311ba6a4') {
            this.privatetrip = true;
            this.opentrip = false;
          }

          for(let x = 0; x < ubahTrip.data.photo_trip.length; x++) {
            this.getBase64ImageFromURL(ubahTrip.data.photo_trip[x]).subscribe(base64data => {
              // console.log(base64data);
              this.myForm.value.photo_trip[x] = base64data;
            });
          }

      }
    )
  
    }
}
