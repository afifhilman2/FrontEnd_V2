import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { DomSanitizer } from '@angular/platform-browser';


import {Router} from "@angular/router";
import { AppService} from '../app.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-jual-trip-content',
  templateUrl: './jual-trip-content.component.html',
  styleUrls: ['./jual-trip-content.component.css']
})
export class JualTripContentComponent implements OnInit {

  url = 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d6030.418742494061!2d-111.34563870463673!3d26.01036670629853!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1471908546569';
  lat = 51.678418
  lng = 7.809007;

  d: Date = new Date();

  successedTrip:boolean = false;
  content1:boolean = true;
  content2:boolean = false;
  bgrError:boolean = true;
  imgError:boolean = true;
  sizeImgError: boolean = true;
  opentrip:boolean = false;
  privatetrip:boolean = true;
  disableDate:boolean = true;
  cekTC = false;
  
  fee:number;
  priceProvider:number;
  feeArr:any[]=[];
  feePrivate:number;
  priceArr:any[]=[];
  priceProviderPrivate:number;
  categoryTrip:any[];
  provinceTrip:any[];
  typeTrip:any[];
  facilityTrip:any[];
  date_temp:any[] = ['','','','',''];
  flag_date:boolean[] = [true, true, true, true, true];
  idTypeOpen:any;
  idTypePrivate:any;
  daysLength;
  daysRange;
  size;
  type;
  meeting_point;


  myForm = this.fb.group({
    trip_name : ['', Validators.required], 
    id_type_trip :['', Validators.required], 
    days : ['', Validators.required],
    night : '', 
    date_trip : this.fb.array(['','','','','']), 
    publish_price : ['', Validators.required], 
    fixed_price : '', 
    service_fee : '', 
    quota_trip : ['', Validators.required], 
    description : ['', Validators.required], 
    notes_traveler : ['', Validators.required], 
    notes_meeting_point :'',
    id_province_trip :['', Validators.required],
    id_category : ['', Validators.required], 
    id_facility : this.fb.array([]), 
    publish_price_group : this.fb.array(['','','','','']), 
    service_fee_group : this.fb.array(['','','','','']), 
    fixed_price_group:this.fb.array(['','','','','']),
    min_qty_group: this.fb.array(['','','','','']),
    zone_time:'WIB',
    jam:['', [Validators.required, Validators.maxLength(2)]],
    menit:['', [Validators.required, Validators.maxLength(2)]],
    time:'',
    photo_trip:this.fb.array([]),
    direction:['', Validators.required],
    meeting_point:'',
    latitude:'',
    longitude:'',
    d_date:this.fb.array([]),

  })

  // var jual trip
  trip = {
    photo_trip : [],
    photo : ['https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png','https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png','https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png','https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png','https://img.travinesia.com/iconweb/icon provider_jual trip_upload logo.png'],
  }

  constructor( private ng2ImgMaxService: Ng2ImgMaxService, public router :Router, public appService: AppService, private toastr: ToastrService, private fb:FormBuilder, public sanitizer: DomSanitizer ) {
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

// validation function

tc(e) {
  if(e.target.checked) {

    this.cekTC = true;
  } else {
    this.cekTC = false;
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

   counter(i:Number) {
    return new Array(i);
  }

  selectDays(e) {

   this.daysLength = e.target.value;
  //  console.log(e);

  //  console.log(this.myForm.value);
    if(this.myForm.controls.days.valid == false) {

      this.disableDate = true;
    } else if (this.myForm.controls.days.valid == true) {
      
      this.disableDate = false;
    }
  }

    // content2
    toggleJual():void {
      
      
      // for(let p=0; p<this.myForm.value.date_trip.length; p++) {
      //   this.myForm.value.date_trip[p] = this.date_temp[p];
      // }
      // console.log(this.myForm.value);
     
      if (this.myForm.controls.trip_name.valid && this.myForm.controls.id_type_trip.valid && this.myForm.controls.days.valid && this.myForm.controls.id_province_trip.valid && this.myForm.controls.id_category.valid ) {
        
        this.content1 = !this.content1;
        this.content2 = !this.content2;
        window.scrollTo(0, 0);

         for(let i=0; i < this.facilityTrip.length; i++) {
          for(let j=0; j < this.myForm.value.id_facility.length; j++) {
            if( this.facilityTrip[i]._id == this.myForm.value.id_facility[j]) {    
                  this.facilityTrip[i].flag_facility = 1;
            }
          }
        }

      } else {
        window.scrollTo(0, 450);
        this.validate1('trip_name');
        this.validate1('id_type_trip');
        this.validate1('days');
        this.validate1('id_province_trip');
        this.validate1('id_category');
      }
    }

    toggleBack():void {
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

    keyPress(event: any) {
      const pattern = /[0-9]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }

    priceFee(e) {
      let p_price = e.target.value;
      this.fee = (p_price *5)/100 ;
      this.myForm.value.service_fee = this.fee;
      this.priceProvider = p_price - this.fee;
      this.myForm.value.fixed_price = this.priceProvider;
      // console.log(e.target.value);
    }

    priceArrFunction(e,i) {
      let p_price = e.target.value;
      this.feeArr[i] = (p_price *5)/100 ;
      this.myForm.value.service_fee_group[i] = this.feeArr[i];
      this.priceArr[i] = p_price - this.feeArr[i];
      this.myForm.value.fixed_price_group[i] = this.priceArr[i]
      // console.log(e.target.value);
    }

    publsihPrivate(e) {
      let p_price = e.target.value;
      this.feePrivate = (p_price *5)/100 ;
      this.priceProviderPrivate = p_price - this.feePrivate;
      // console.log(e.target.value);
    }


    // submit jual trip
   onSubmitTrip1() {

      this.myForm.value.time = this.myForm.value.jam + ':' + this.myForm.value.menit;
      this.myForm.value.latitude =this.lat;
      this.myForm.value.longitude = this.lng;
      this.myForm.value.meeting_point = this.meeting_point;
      this.myForm.value.notes_meeting_point = this.myForm.value.notes_meeting_point.replace(/\n/g, "<br>");
      this.myForm.value.notes_traveler = this.myForm.value.notes_traveler.replace(/\n/g, "<br>");
      this.myForm.value.description = this.myForm.value.description.replace(/\n/g, "<br>");

      if (this.myForm.valid) {

        if(this.cekTC == false) {

          this.toastr.error('Harap isi bagian persetujuan');
        } else {
          // console.log(this.myForm.value)
        this.appService.addTripProvider(this.myForm.value).subscribe(trip => {
          // console.log(trip); 
            if(trip.status == 200) {

              this.toastr.success('Trip Berhasil ditambahkan');
              this.successedTrip = true;
              this.content1 = !this.content1;
              this.content2 = !this.content2;  
            
              this.router.navigateByUrl('/Provider/DaftarTrip', {skipLocationChange: true}).then(()=>
                this.router.navigate(['/Provider/DaftarTrip']));
            }

              })

        }

      } else 
      {
        this.validateAllFormFields(this.myForm);
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

    }

    else {
      this.sizeImgError = false;
      this.bgrError = false;
    }
    
  }
  
  _handleReaderLoaded1(readerEvt) {
     let binaryString = readerEvt.target.result;
            this.myForm.value.photo_trip[0]= btoa(binaryString);

            this.trip.photo[0]="data:image/jpeg;base64,"+ btoa(binaryString);       
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
       this.myForm.value.photo_trip[1]= btoa(binaryString); 
       this.trip.photo[1]="data:image/jpeg;base64,"+ btoa(binaryString);         
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
       this.myForm.value.photo_trip[2]= btoa(binaryString); 
       this.trip.photo[2]="data:image/jpeg;base64,"+ btoa(binaryString);          
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
         this.myForm.value.photo_trip[3]= btoa(binaryString); 
         this.trip.photo[3]="data:image/jpeg;base64,"+ btoa(binaryString);          
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
          this.myForm.value.photo_trip[4]= btoa(binaryString); 
          this.trip.photo[4]="data:image/jpeg;base64,"+ btoa(binaryString);         
        }
        // end upload image

      checked(e,i) {
        const facilityArray = <FormArray>this.myForm.controls.id_facility; 
                
        if(e.target.checked) {
          facilityArray.push(new FormControl(i));
          // console.log(facilityArray);
        }
        else  {
          let index = facilityArray.controls.findIndex(x=> x.value == i)
          facilityArray.removeAt(index);
          // console.log(facilityArray);
        }

      }

      onDateChanged(event:IMyDateModel, index) {
        let daysLength = event.date.day + (parseInt(this.myForm.value.days) - 1);
        this.myForm.value.d_date[index] = event.date;
    
        if(event.date.day == 0 && index == 0) {
          this.myForm.value.date_trip[index]='';
          for(var i = index+1; i < this.date_temp.length; i++){
            this.date_temp[i] = null;
            this.flag_date[i-1] = true;
            this.myForm.value.date_trip[index] = '';
          }
          this.myDatePickerOptions = {
            dateFormat: 'dd mmm yyyy',
            disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate()-1}
          };
        }
        else if(event.date.day == 0 && (index == 1 || index == 2 || index == 3 || index == 4)) {
          this.myForm.value.date_trip[index]='';
          for(var i = index+1; i < this.date_temp.length; i++){
            this.date_temp[i] = null;
            this.flag_date[i-1] = true;
            this.myForm.value.date_trip[index] = '';
          }
          this.myDatePickerOptions = {
            dateFormat: 'dd mmm yyyy',
            disableUntil: {year: this.myForm.value.d_date[index-1].year, month: this.myForm.value.d_date[index-1].month, day:this.myForm.value.d_date[index-1].day + daysLength}
          };
        }
        else {
          this.flag_date[index] = false;
          this.myForm.value.date_trip[index] = event.date.year + "-" + event.date.month + "-" + event.date.day;
          this.myDatePickerOptions = {
            dateFormat: 'dd mmm yyyy',
            disableUntil: {year: this.myForm.value.d_date[index].year, month: this.myForm.value.d_date[index].month, day: daysLength}
          };
        }
        // console.log(this.myForm.value.date_trip)
      }

      // dateValue0(event: IMyDateModel) {
        
      //   this.daysRange = event.date.day + (parseInt(this.daysLength) - 1);
      //   // this.myForm.value.date_trip[0] = event.jsdate;
      //   this.dateTemp[0] = event.jsdate;
      //   this.myForm.value.d_date[0] = event.date;

      //   // console.log(this.myForm.value);

      //   if(event.date.day == 0) {
      //     // console.log(event.date.day);
      //     this.myForm.value.date_trip[0]='';
      //     this.myDatePickerOptions = {
      //       disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate()-1}
      //       };
      //     } else {
      //     this.myDatePickerOptions = {
      //       disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.daysRange}
      //     };
      //   }
      // }

      // dateValue1(event: IMyDateModel) {
        
      //   this.daysRange = event.date.day + (parseInt(this.daysLength) - 1);
      //   // this.myForm.value.date_trip[1] = event.jsdate;
      //   this.myForm.value.d_date[1] = event.date;
      //   this.dateTemp[1] = event.jsdate;
      //   // console.log(this.myForm.value.date_trip[1]);

      //   if(event.date.day == 0) {
      //     // console.log(event.date.day);
      //     this.myForm.value.date_trip[1]='';
      //     this.myDatePickerOptions = {
      //       disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day:this.myForm.value.d_date[0].day}
      //       };
      //     } else {
      //     this.myDatePickerOptions = {
      //       disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.daysRange}
      //     };
      //   }
      // }

      // dateValue2(event: IMyDateModel) {
        
      //   this.daysRange = event.date.day + (parseInt(this.daysLength) - 1);
      //   // this.myForm.value.date_trip[2] = event.jsdate;
      //   this.dateTemp[2] = event.jsdate;
      //   this.myForm.value.d_date[2] = event.date;

      //   if(event.date.day == 0) {
      //     // console.log(event.date.day);
      //     this.myForm.value.date_trip[2]='';
      //     this.myDatePickerOptions = {
      //       disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day:this.myForm.value.d_date[1].day}
      //       };
      //     } else {
      //     this.myDatePickerOptions = {
      //       disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.daysRange}
      //     };
      //   }
      // }

      // dateValue3(event: IMyDateModel) {
        
      //   this.daysRange = event.date.day + (parseInt(this.daysLength) - 1);
      //   // this.myForm.value.date_trip[3] = event.jsdate;
      //   this.dateTemp[3] = event.jsdate;
      //   this.myForm.value.d_date[3] = event.date;

      //   if(event.date.day == 0) {
      //     // console.log(event.date.day);
      //     this.myForm.value.date_trip[3]='';
      //     this.myDatePickerOptions = {
      //       disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day:this.myForm.value.d_date[2].day}
      //       };
      //     } else {
      //     this.myDatePickerOptions = {
      //       disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.daysRange}
      //     };
      //   }
      // }

      // dateValue4(event: IMyDateModel) {
        
      //   this.daysRange = event.date.day + (parseInt(this.daysLength) - 1);
      //   // this.myForm.value.date_trip[4] = event.jsdate;
      //   this.dateTemp[4] = event.jsdate;
      //   this.myForm.value.d_date[4] = event.date;

      //   if(event.date.day == 0) {
      //     // console.log(event.date.day);
      //     this.myForm.value.date_trip[4]='';
      //     this.myDatePickerOptions = {
      //       disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day:this.myForm.value.d_date[3].day}
      //       };
      //     } else {
      //     this.myDatePickerOptions = {
      //       disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.daysRange}
      //     };
      //   }
      // }

      timePress(event: any) {
        // console.log(event.target.value)
        const pattern = /[0-9]/;
    
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
      }

  ngOnInit() {
    window.scrollTo(0, 0);

      this.myForm.patchValue({
        id_type_trip:this.idTypeOpen,
      });
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
