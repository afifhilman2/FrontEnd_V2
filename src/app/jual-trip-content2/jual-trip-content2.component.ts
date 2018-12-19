import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Router, ActivatedRoute} from "@angular/router";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AppService} from '../app.service';
import { DatePipe } from '@angular/common';
import {IMyDpOptions} from 'mydatepicker';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Ng2ImgMaxService } from 'ng2-img-max';


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

  d: Date = new Date();
  
  successedTrip:boolean = false;
  content1:boolean = true;
  content2:boolean = false;
  opentrip:boolean = true;
  privatetrip:boolean = false;
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
  value;

  size;
  type;

  myForm = this.fb.group({
    trip_name : ['', Validators.required], 
    id_type_trip : [{value: '', disabled: true}], 
    days : [{value: '', disabled: true}],
    night : '', 
    date_trip : this.fb.array([]), 
    publish_price : ['', Validators.required], 
    fixed_price : '', 
    service_fee : '', 
    quota_trip : [{value: '', disabled: true}], 
    description : [{value: '', disabled: true}], 
    notes_traveler : ['', Validators.required], 
    notes_meeting_point :['', Validators.required],
    id_province :[{value: '', disabled: true}],
    id_category : '', 
    id_facility : this.fb.array([]), 
    id_status_trip : '',
    time:'',
    zone_time:[{value: '', disabled: true}],
    publish_price_group : this.fb.array(['','','','','']), 
    service_fee_group : '', 
    min_qty_group: this.fb.array(['','','','','']),
    latitude:'',
    longitude:'',
    direction:['', Validators.required]

  })

  trip = {
    photo_trip:[],
    photo:[],
    photo_trip_default : ['https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png','https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png','https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png','https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png','https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png'],
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

  constructor( private ng2ImgMaxService: Ng2ImgMaxService, public router :Router, public fb:FormBuilder, private toastr: ToastrService, private routeActive:ActivatedRoute, private appService: AppService,  public sanitizer: DomSanitizer, private http:Http, private datePipe:DatePipe ) 
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

  createAuthorizationHeader (headers:Headers) {
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
  }

  autoCompleteCallback1(selectedData:any) {
    this.lat = selectedData.data.geometry.location.lat;
    this.lng = selectedData.data.geometry.location.lng;
    this.setURL(this.lat, this.lng) 
  }

  setURL(lat,lng){
    this.url = 'https://maps.google.com/maps?q='+lat+','+lng+'&hl=es;z=14&amp&output=embed';

    return this.url;
  }

  counter(i:Number) {
    return new Array(i);
  }

   // content2
  toggleJual():void {

    if(this.myForm.controls.trip_name.valid && this.myForm.controls.id_category.valid) {
      this.content1 = !this.content1;
      this.content2 = !this.content2;
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 450);
      this.validate1('trip_name');
      this.validate1('id_category');
    }
    
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

  close() {
    this.imgError = true;
    this.sizeImgError = true
    this.bgrError = true;
  }

onSubmitTrip() {

  // this.myForm.value.notes_meeting_point = this.myForm.value.notes_meeting_point.replace(/\n/g, "<br>");
  // this.myForm.value.notes_traveler = this.myForm.value.notes_traveler.replace(/\n/g, "<br>");
  // this.myForm.value.description = this.myForm.value.description.replace(/\n/g, "<br>");

  if(this.myForm.controls.notes_meeting_point.valid && this.myForm.controls.notes_traveler.valid && this.myForm.controls.direction.valid && this.myForm.controls.publish_price.valid ) {
      
    if(this.trip.photo[0] != this.trip.photo_trip[0] || this.trip.photo[1] != this.trip.photo_trip[1] || this.trip.photo[2] != this.trip.photo_trip[2] || this.trip.photo[3] != this.trip.photo_trip[3] || this.trip.photo[4] != this.trip.photo_trip[4]) {

     
      this.appService.editPhotoTrip(this.idParams, this.trip).subscribe( photo => {
        // console.log(this.trip)
        // console.log(photo);
        // console.log(this.trip)
      });

      let headers = new Headers();
        
      this.createAuthorizationHeader (headers);
      return this.http.put('https://travinesia.com:1210/v1/provider/edit_trip/'+ this.idParams, this.myForm.value,
      {headers: headers})
      .subscribe(
        (res:Response)=> {
          let nullTrip = res.json();
            //  console.log(nullTrip);
          if(nullTrip.status == 200) {
            
            this.toastr.success('Trip Berhasil diubah');
    
            this.successedTrip = true;
            this.content1 = !this.content1;
            this.content2 = !this.content2;

            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/Provider/DaftarTrip']));
      
           }
        }
      )

    } 
    
    else if( this.trip.photo[0] == this.trip.photo_trip[0] || this.trip.photo[1] == this.trip.photo_trip[1] || this.trip.photo[2] == this.trip.photo_trip[2] || this.trip.photo[3] == this.trip.photo_trip[3] || this.trip.photo[4] == this.trip.photo_trip[4]) {
      
      let headers = new Headers();
        
      this.createAuthorizationHeader (headers);
      return this.http.put('https://travinesia.com:1210/v1/provider/edit_trip/'+ this.idParams, this.myForm.value,
      {headers: headers})
      .subscribe(
        (res:Response)=> {
          let nullTrip = res.json();
    
          if(nullTrip.status == 200) {
            
            this.toastr.success('Trip Berhasil diubah');
    
            this.successedTrip = true;
            this.content1 = !this.content1;
            this.content2 = !this.content2;

            this.router.navigateByUrl('/Provider/DaftarTrip', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/Provider/DaftarTrip']));
      
           }
        }
      )

    }
  
   } else {

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
            this.trip.photo_trip[0]=btoa(binaryString);
            this.trip.photo_trip_default[0]="data:image/jpeg;base64,"+ btoa(binaryString);  
            
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
       this.trip.photo_trip[1]=btoa(binaryString);
       this.trip.photo_trip_default[1]="data:image/jpeg;base64,"+ btoa(binaryString);         
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
       this.trip.photo_trip[2]=btoa(binaryString);
       this.trip.photo_trip_default[2]="data:image/jpeg;base64,"+ btoa(binaryString);          
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
         this.trip.photo_trip[3]=btoa(binaryString);
         this.trip.photo_trip_default[3]="data:image/jpeg;base64,"+ btoa(binaryString);          
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
           this.trip.photo_trip[4]=btoa(binaryString);
           this.trip.photo_trip_default[4]="data:image/jpeg;base64,"+ btoa(binaryString);         
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
  

  ngOnInit() {
  
    return this.http.get('https://travinesia.com:1210/get/detail_provider_trip/'+ this.idParams,)
    .subscribe(
      (res:Response)=> {
        let ubahTrip = res.json();        

        this.time = ubahTrip.data.time;
        this.lat = ubahTrip.data.latitude;
        this.lng = ubahTrip.data.longitude;
        this.url = 'https://maps.google.com/maps?q='+this.lat+','+this.lng+'&hl=es;z=14&amp&output=embed';

        // console.log(ubahTrip.data)

          this.myForm.patchValue({
            trip_name: ubahTrip.data.trip_name,
            id_type_trip: ubahTrip.data.id_type_trip._id,
            days: ubahTrip.data.days,
            publish_price : ubahTrip.data.publish_price, 
            quota_trip : ubahTrip.data.quota_trip, 
            description : ubahTrip.data.description.replace(/<br\s*[\/]?>/gi, "\n"), 
            notes_traveler : ubahTrip.data.notes_traveler.replace(/<br\s*[\/]?>/gi, "\n"), 
            notes_meeting_point : ubahTrip.data.notes_meeting_point.replace(/<br\s*[\/]?>/gi, "\n"),
            id_province : ubahTrip.data.id_province._id,
            id_category : ubahTrip.data.category[0]._id, 
            time: ubahTrip.data.time,
            zone_time: ubahTrip.data.zone_time, 
            direction: ubahTrip.data.direction,
            publish_price_group : [], 
            service_fee_group : [], 
            photo:[],
            fixed_price_grorup : [],
          })

            let dateGroup = ubahTrip.data.date_trip.map (date_trip => this.fb.control(date_trip));
            this.myForm.setControl('date_trip', this.fb.array(dateGroup));

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

          // phototrip
          for(let n=0; n<=4; n++) {
            this.trip.photo_trip_default[n] = ubahTrip.data.photo_trip[n];
            this.trip.photo[n] = ubahTrip.data.photo_trip[n];
            this.trip.photo_trip[n] = ubahTrip.data.photo_trip[n];
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
