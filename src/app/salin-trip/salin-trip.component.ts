import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Router, ActivatedRoute} from "@angular/router";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AppService} from '../app.service';
import { DatePipe } from '@angular/common';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-salin-trip',
  templateUrl: './salin-trip.component.html',
  styleUrls: ['./salin-trip.component.css']
})
export class SalinTripComponent implements OnInit {


  url = 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d6030.418742494061!2d-111.34563870463673!3d26.01036670629853!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1471908546569';

  lat;
  lng;

  successedTrip:boolean = false;
  content1:boolean = true;
  content2:boolean = false;
  opentrip:boolean = true;
  privatetrip:boolean = false;
  disableDate:boolean = true;
  bgrError:boolean = true;
  imgError:boolean = true;
  sizeImgError: boolean = true;

  fee:number;
  priceProvider:number;
  p_price:number;
  p_arr:number;
  p_publish:number;
  feeArr:any[]=[];
  feePrivate:number;
  priceArr:any[]=[];
  priceProviderPrivate:number;

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
  daysLength;
  daysRange;
  facilityTrip:any[];
  time;
  meeting_point;
  
  size;
  type;

  myForm = this.fb.group({
    trip_name : ['', Validators.required], 
    id_type_trip : '', 
    days : '',
    night : '', 
    date_trip : this.fb.array([]), 
    publish_price : ['', Validators.required], 
    fixed_price : '', 
    service_fee : '', 
    quota_trip : ['', Validators.required], 
    description : ['', Validators.required], 
    notes_traveler : ['', Validators.required], 
    notes_meeting_point :'',
    id_province_trip :'',
    id_category : '', 
    id_facility : this.fb.array([]), 
    id_status_trip : '', 
    service_fee_group : this.fb.array(['','','','','']), 
    time:'',
    jam:'',
    menit:'',
    direction:['', Validators.required],
    meeting_point:'',
    latitude:'',
    longitude:'',
    zone_time:'',
    publish_price_group : this.fb.array(['','','','','']), 
    min_qty_group: this.fb.array(['','','','','']),
    photo_trip :this.fb.array([]),
    d_date:this.fb.array([]),

  })


  trip = {
    photo_trip : ['https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png','https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png','https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png','https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png','https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png'],
  }

  autoCompleteCallback1(selectedData:any) {
    // console.log(selectedData);
    this.meeting_point = selectedData.data.name;
    this.lat = selectedData.data.geometry.location.lat;
    this.lng = selectedData.data.geometry.location.lng;

    this.setURL(this.lat, this.lng)
}

setURL(lat,lng){
  this.url = 'https://maps.google.com/maps?q='+lat+','+lng+'&hl=es;z=14&amp&output=embed';
  return this.url;
}

isFieldValid(field: string) {
  return !this.myForm.get(field).valid && this.myForm.get(field).touched;
}

displayFieldCss(field: string) {
  return {
    'has-error': this.isFieldValid(field),
    'has-feedback': this.isFieldValid(field)
  };
}

// validate submit
  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => { 
      const control = formGroup.get(field);            
      
      if (control instanceof FormControl) {            
        control.markAsTouched({ onlySelf: true });

      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
    });
  }

  validate1(field: string) { 
      const control = this.myForm.get(field);            
      
      if (control instanceof FormControl) {            
        control.markAsTouched({ onlySelf: true });

      }
  }

  constructor( private ng2ImgMaxService: Ng2ImgMaxService, public router :Router, public fb:FormBuilder, private toastr: ToastrService, public sanitizer: DomSanitizer, private routeActive:ActivatedRoute, private appService: AppService, private http:Http, private datePipe:DatePipe ) 
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

    if(this.myForm.controls.trip_name.valid) {

      this.content1 = !this.content1;
      this.content2 = !this.content2;
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 450);
    this.validate1('trip_name');
  }

   
  }

  createAuthorizationHeader (headers:Headers) {
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
}

selectDays(e) {
  this.daysLength = e.target.value;
 
   if(this.myForm.controls.days.valid == false) {

     this.disableDate = true;
   } else if (this.myForm.controls.days.valid == true) {
     
     this.disableDate = false;
   }
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

  close() {
    this.imgError = true;
    this.sizeImgError = true
    this.bgrError = true;
  }

onSubmitTrip() {

  console.log(this.myForm.value);
  if(this.myForm.controls.notes_meeting_point.valid && this.myForm.controls.notes_traveler.valid && this.myForm.controls.direction.valid && this.myForm.controls.publish_price.valid ) {

      this.myForm.value.latitude =this.lat;
      this.myForm.value.longitude = this.lng;
      this.myForm.value.meeting_point = this.meeting_point;
  // console.log(this.myForm.value);
     this.appService.addTripProvider(this.myForm.value).subscribe(trip => {
       
    // console.log(trip); 

    if(trip.status == 200) {

      this.toastr.success('Trip Berhasil disalin');

      this.successedTrip = true;
      this.content1 = !this.content1;
      this.content2 = !this.content2;

      this.router.navigateByUrl('/Provider/DaftarTrip', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/Provider/DaftarTrip']));
       
    }
  })
} 
else {

  this.validate1('notes_meeting_point');
  this.validate1('notes_traveler');
  this.validate1('direction');
  this.validate1('publish_price');
}

}

   //upload image
   uploadImage1(evt) {
    this.size = (evt.target.files[0].size) / Math.pow(1024,2); 
    this.type = evt.target.files[0].type;
  
    
    if(this.size <= 2) {
  
      if(this.type == 'image/png' || this.type == 'image/jpg' || this.type == 'image/jpeg') {
        let files = evt.target.files;
        let file = files[0];
  
      if (files && file) {

        this.ng2ImgMaxService.compressImage(file, 0.250).subscribe(
          result => {
           let uploadedImage = new File([result], result.name);
          //  console.log(uploadedImage)

          let reader = new FileReader();
          reader.onload =this._handleReaderLoaded1.bind(this);
          reader.readAsBinaryString(uploadedImage);

          })
          
      }
  
      } else 
  
      {
        this.imgError = false;
        this.bgrError = false;
      }
  
      // console.log('ukuran masuk')
    }
  
    else {
      this.sizeImgError = false;
      this.bgrError = false;
      // console.log('ukuran ga masuk')
    }
    
  }
  
  _handleReaderLoaded1(readerEvt) {
     let binaryString = readerEvt.target.result; 
            this.myForm.value.photo_trip[0]=btoa(binaryString);
            // console.log(this.myForm.value.photo_trip[0])
            this.trip.photo_trip[0]="data:image/jpeg;base64,"+ btoa(binaryString);  
            
    }

    uploadImage2(evt) {
      this.size = (evt.target.files[0].size) / Math.pow(1024,2); 
      this.type = evt.target.files[0].type;
   
      
      if(this.size <= 2) {
  
        if(this.type == 'image/png' || this.type == 'image/jpg' || this.type == 'image/jpeg') {
          let files = evt.target.files;
          let file = files[0];
    
        if (files && file) {

          this.ng2ImgMaxService.compressImage(file, 0.250).subscribe(
            result => {
             let uploadedImage = new File([result], result.name);
            //  console.log(uploadedImage)
  
            let reader = new FileReader();
            reader.onload =this._handleReaderLoaded2.bind(this);
            reader.readAsBinaryString(uploadedImage);
  
            })
          
        }
    
        } else 
    
        {
          this.imgError = false;
          this.bgrError = false;
        }
  
        // console.log('ukuran masuk')
      }
  
      else {
        this.sizeImgError = false;
        this.bgrError = false;
        // console.log('ukuran ga masuk')
      }
      
    }
    
    _handleReaderLoaded2(readerEvt) {
       let binaryString = readerEvt.target.result;
       this.myForm.value.photo_trip[1]=btoa(binaryString);
       this.trip.photo_trip[1]="data:image/jpeg;base64,"+ btoa(binaryString);         
      }

      uploadImage3(evt) {
        this.size = (evt.target.files[0].size) / Math.pow(1024,2); 
        this.type = evt.target.files[0].type;
     
        
        if(this.size <= 2) {
    
          if(this.type == 'image/png' || this.type == 'image/jpg' || this.type == 'image/jpeg') {
            let files = evt.target.files;
            let file = files[0];
      
          if (files && file) {

            this.ng2ImgMaxService.compressImage(file, 0.250).subscribe(
              result => {
               let uploadedImage = new File([result], result.name);
              //  console.log(uploadedImage)
    
              let reader = new FileReader();
              reader.onload =this._handleReaderLoaded3.bind(this);
              reader.readAsBinaryString(uploadedImage);
    
              })
            
          }
      
          } else 
      
          {
            this.imgError = false;
            this.bgrError = false;
          }
    
          // console.log('ukuran masuk')
        }
    
        else {
          this.sizeImgError = false;
          this.bgrError = false;
          // console.log('ukuran ga masuk')
        }
        
      }
    
    _handleReaderLoaded3(readerEvt) {
       let binaryString = readerEvt.target.result;
       this.myForm.value.photo_trip[2]=btoa(binaryString);
       this.trip.photo_trip[2]="data:image/jpeg;base64,"+ btoa(binaryString);          
      }

      uploadImage4(evt) {
        this.size = (evt.target.files[0].size) / Math.pow(1024,2); 
        this.type = evt.target.files[0].type;
     
        
        if(this.size <= 2) {
    
          if(this.type == 'image/png' || this.type == 'image/jpg' || this.type == 'image/jpeg') {
            let files = evt.target.files;
            let file = files[0];
      
          if (files && file) {

            this.ng2ImgMaxService.compressImage(file, 0.250).subscribe(
              result => {
               let uploadedImage = new File([result], result.name);
              //  console.log(uploadedImage)
    
              let reader = new FileReader();
              reader.onload =this._handleReaderLoaded4.bind(this);
              reader.readAsBinaryString(uploadedImage);
    
              })
          
          }
      
          } else 
      
          {
            this.imgError = false;
            this.bgrError = false;
          }
    
          // console.log('ukuran masuk')
        }
    
        else {
          this.sizeImgError = false;
          this.bgrError = false;
          // console.log('ukuran ga masuk')
        }
        
      }
      
      _handleReaderLoaded4(readerEvt) {
         let binaryString = readerEvt.target.result;
         this.myForm.value.photo_trip[3]=btoa(binaryString);
         this.trip.photo_trip[3]="data:image/jpeg;base64,"+ btoa(binaryString);          
        }

        uploadImage5(evt) {
          this.size = (evt.target.files[0].size) / Math.pow(1024,2); 
          this.type = evt.target.files[0].type;
       
          
          if(this.size <= 2) {
      
            if(this.type == 'image/png' || this.type == 'image/jpg' || this.type == 'image/jpeg') {
              let files = evt.target.files;
              let file = files[0];
        
            if (files && file) {

              this.ng2ImgMaxService.compressImage(file, 0.250).subscribe(
                result => {
                 let uploadedImage = new File([result], result.name);
                //  console.log(uploadedImage)
      
                let reader = new FileReader();
                reader.onload =this._handleReaderLoaded5.bind(this);
                reader.readAsBinaryString(uploadedImage);
      
                })
            
            }
        
            } else 
        
            {
              this.imgError = false;
              this.bgrError = false;
            }
      
            // console.log('ukuran masuk')
          }
      
          else {
            this.sizeImgError = false;
            this.bgrError = false;
            // console.log('ukuran ga masuk')
          }
          
        }
        
        _handleReaderLoaded5(readerEvt) {
           let binaryString = readerEvt.target.result;
           this.myForm.value.photo_trip[4]=btoa(binaryString);
           this.trip.photo_trip[4]="data:image/jpeg;base64,"+ btoa(binaryString);         
          }

          // end upload image

          dateValue0(event: IMyDateModel) {
        
            this.daysRange = event.date.day + (parseInt(this.daysLength) - 1);
            this.myForm.value.date_trip[0] = event.jsdate;
            this.myForm.value.d_date[0] = event.date;
    
            if(event.date.day == 0) {
              // console.log(event.date.day);
              this.myForm.value.date_trip[0]='';
              this.myDatePickerOptions = {
                disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate()-1}
                };
              } else {
              this.myDatePickerOptions = {
                disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.daysRange}
              };
            }
          }
    
          dateValue1(event: IMyDateModel) {
            
            this.daysRange = event.date.day + (parseInt(this.daysLength) - 1);
            this.myForm.value.date_trip[1] = event.jsdate;
            this.myForm.value.d_date[1] = event.date;
    
            if(event.date.day == 0) {
              // console.log(event.date.day);
              this.myForm.value.date_trip[1]='';
              this.myDatePickerOptions = {
                disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day:this.myForm.value.d_date[0].day}
                };
              } else {
              this.myDatePickerOptions = {
                disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.daysRange}
              };
            }
          }
    
          dateValue2(event: IMyDateModel) {
            
            this.daysRange = event.date.day + (parseInt(this.daysLength) - 1);
            this.myForm.value.date_trip[2] = event.jsdate;
            this.myForm.value.d_date[2] = event.date;
    
            if(event.date.day == 0) {
              // console.log(event.date.day);
              this.myForm.value.date_trip[2]='';
              this.myDatePickerOptions = {
                disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day:this.myForm.value.d_date[1].day}
                };
              } else {
              this.myDatePickerOptions = {
                disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.daysRange}
              };
            }
          }
    
          dateValue3(event: IMyDateModel) {
            
            this.daysRange = event.date.day + (parseInt(this.daysLength) - 1);
            this.myForm.value.date_trip[3] = event.jsdate;
            this.myForm.value.d_date[3] = event.date;
    
            if(event.date.day == 0) {
              // console.log(event.date.day);
              this.myForm.value.date_trip[3]='';
              this.myDatePickerOptions = {
                disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day:this.myForm.value.d_date[2].day}
                };
              } else {
              this.myDatePickerOptions = {
                disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.daysRange}
              };
            }
          }
    
          dateValue4(event: IMyDateModel) {
            
            this.daysRange = event.date.day + (parseInt(this.daysLength) - 1);
            this.myForm.value.date_trip[4] = event.jsdate;
            this.myForm.value.d_date[4] = event.date;
    
            if(event.date.day == 0) {
              // console.log(event.date.day);
              this.myForm.value.date_trip[4]='';
              this.myDatePickerOptions = {
                disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day:this.myForm.value.d_date[3].day}
                };
              } else {
              this.myDatePickerOptions = {
                disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.daysRange}
              };
            }
          }

      keyPress(event: any) {
        const pattern = /[0-9]/;
    
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
      }

      // getBase64ImageFromURL(url: string) {
      //   return Observable.create((observer: Observer<string>) => {
      //     let img = new Image();
      //     img.crossOrigin = 'Anonymous';
      //     img.src = url;
      //     if (!img.complete) {
      //       img.onload = () => {
      //         observer.next(this.getBase64Image(img));
      //         observer.complete();
      //       };
      //       img.onerror = (err) => {
      //         observer.error(err);
      //       };
      //     } else {
      //       observer.next(this.getBase64Image(img));
      //       observer.complete();
      //     }
      //   });
      // }
    
      // getBase64Image(img: HTMLImageElement) {
      //   var canvas = document.createElement("canvas");
      //   canvas.width = img.width;
      //   canvas.height = img.height;
      //   var ctx = canvas.getContext("2d");
      //   ctx.drawImage(img, 0, 0);
      //   var dataURL = canvas.toDataURL("image/png");
      //   return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      // }

      priceFee(e) {
        this.p_price = e.target.value;
  
        this.fee = (this.p_price *5)/100 ;
        this.myForm.value.service_fee = this.fee;
        this.priceProvider = this.p_price - this.fee;
        this.myForm.value.fixed_price = this.priceProvider;
        // console.log(e.target.value);
      }

      priceArrFunction(e,i) {
        this.p_arr = e.target.value;
        this.feeArr[i] = (this.p_price *5)/100 ;
        this.myForm.value.service_fee_group[i] = this.feeArr[i];
        this.priceArr[i] = this.p_price - this.feeArr[i];
        this.myForm.value.fixed_price_group[i] = this.priceArr[i]
        // console.log(e.target.value);
      }

      publsihPrivate(e) {
        this.p_publish = e.target.value;
        this.feePrivate = (this.p_publish *5)/100 ;
        this.priceProviderPrivate = this.p_publish - this.feePrivate;
        // console.log(e.target.value);
      }

      timePress(event: any) {
        // console.log(event.target.value)
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

        this.time = ubahTrip.data.time
        this.lat = ubahTrip.data.latitude;
        this.lng = ubahTrip.data.longitude;
        this.url = 'https://maps.google.com/maps?q='+this.lat+','+this.lng+'&hl=es;z=14&amp&output=embed';
        this.daysLength = ubahTrip.data.days;

        // console.log(ubahTrip);

          this.myForm.patchValue({
            trip_name: ubahTrip.data.trip_name,
            id_type_trip: ubahTrip.data.id_type_trip._id,
            days: ubahTrip.data.days,
            publish_price : ubahTrip.data.publish_price, 
            quota_trip : ubahTrip.data.quota_trip, 
            description : ubahTrip.data.description.replace(/<br\s*[\/]?>/gi, "\n"), 
            notes_traveler : ubahTrip.data.notes_traveler.replace(/<br\s*[\/]?>/gi, "\n"), 
            notes_meeting_point : ubahTrip.data.notes_meeting_point.replace(/<br\s*[\/]?>/gi, "\n"),
            id_province_trip: ubahTrip.data.id_province._id,
            id_category : ubahTrip.data.category[0]._id, 
            time: ubahTrip.data.time,
            direction: ubahTrip.data.direction,
            zone_time: ubahTrip.data.zone_time, 
            service_fee_group : [], 
            photo:[],
            fixed_price_grorup : [],
          })

            // let dateGroup = ubahTrip.data.date_trip.map (date_trip => this.fb.control(date_trip));
            // this.myForm.setControl('date_trip', this.fb.array(dateGroup));

            this.myForm.setControl('id_facility', this.fb.array(ubahTrip.data.facility || []));
            this.myForm.setControl('min_qty_group', this.fb.array(ubahTrip.data.min_qty_group || []));
            this.myForm.setControl('publish_price_group', this.fb.array(ubahTrip.data.publish_price_group || []));
            this.myForm.setControl('photo_trip', this.fb.array(ubahTrip.data.photo_trip || []));

            // publishopentrip
            this.p_price = ubahTrip.data.publish_price; 
            this.fee = (this.p_price *5)/100 ;
            this.priceProvider = this.p_price - this.fee;

            // publsihPrivate
            this.p_publish = ubahTrip.data.publish_price;
            this.feePrivate = (this.p_publish *5)/100 ;
            this.priceProviderPrivate = this.p_publish - this.feePrivate;

            // functionArr
            this.p_arr = ubahTrip.data.publish_price_group;
            for(let x=0; x < ubahTrip.data.publish_price_group.length; x++) {
              this.feeArr[x] = (this.p_arr[x] *5)/100 ;
              this.priceArr[x] = this.p_arr[x] - this.feeArr[x];
            }
        
    
            for(let i=0; i < this.facilityTrip.length; i++) {
              for(let j=0; j < this.myForm.value.id_facility.length; j++) {
                if( this.facilityTrip[i]._id == this.myForm.value.id_facility[j]) {
                  
                  this.facilityTrip[i].flag_facility = 1;
                }

              }
            }

            // disableDate
            if(this.myForm.controls.days.valid == false) {

              this.disableDate = true;
            } else if (this.myForm.controls.days.valid == true) {
              
              this.disableDate = false;
            }

            // for( let n=0; n<=4; n++) {
            //   this.trip.photo_trip[n] = ubahTrip.data.photo_trip[n];
            // }
            
             // private trip
          if(ubahTrip.data.id_type_trip._id == '5a85391c0ee623c4311ba6a4') {
            this.privatetrip = true;
            this.opentrip = false;
            } 
            // else if (ubahTrip.data.id_type_trip._id != '5a85391c0ee623c4311ba6a4') {
              
            //   console.log("private")
            //   console.log(this.myForm.value);
            //   this.myForm.value.min_qty_group = [10,10,10,10,10];
            //   this.myForm.value.publish_price_group = [10,10,10,10,10];
            //   this.myForm.value.service_fee_group = [10,10,10,10,10];
            // }

          // for(let x = 0; x < ubahTrip.data.photo_trip.length; x++) {
          //   this.getBase64ImageFromURL(ubahTrip.data.photo_trip[x]).subscribe(base64data => {
          //     this.myForm.value.photo_trip[x] = base64data;
          //   });
          // }

      }
    )

    }

    public myDatePickerOptions: IMyDpOptions = {
      dateFormat: 'dd mmm yyyy',
      sunHighlight: true,
      inline: false,
      disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate()-1},
      editableDateField: false,
      openSelectorOnInputClick: true,
  };
}
