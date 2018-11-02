import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { DomSanitizer } from '@angular/platform-browser';


import {Router} from "@angular/router";
import { AppService} from '../app.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-jual-trip-content',
  templateUrl: './jual-trip-content.component.html',
  styleUrls: ['./jual-trip-content.component.css']
})
export class JualTripContentComponent implements OnInit {

  url = 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d6030.418742494061!2d-111.34563870463673!3d26.01036670629853!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1471908546569';


  lat = 51.678418
  lng = 7.809007;

  successedTrip:boolean = false;
  content1:boolean = true;
  content2:boolean = false;
  imgError:boolean = true;

  opentrip:boolean = true;
  privatetrip:boolean = false;
  d: Date = new Date();

  categoryTrip:any[];
  provinceTrip:any[];
  typeTrip:any[];
  facilityTrip:any[];
  idTypeOpen:any;
  idTypePrivate:any;
  daysLength;
  daysRange;
  size;
  type;
  disableDate:boolean = true;
  meeting_point;

  myForm = this.fb.group({
    trip_name : ['', Validators.required], 
    id_type_trip :['', Validators.required], 
    days : ['', Validators.required],
    night : '', 
    date_trip : this.fb.array([]), 
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
    service_fee_group : '', 
    min_qty_group: this.fb.array(['','','','','']),
    zone_time:'WIB',
    jam:['', [Validators.required, Validators.maxLength(2)]],
    menit:['', [Validators.required, Validators.maxLength(2)]],
    time:'',
    photo_trip:this.fb.array([]),
    dateArr:this.fb.array([]),
    direction:['', Validators.required],
    meeting_point:'',
    latitude:'',
    longitude:'',

  })

  autoCompleteCallback1(selectedData:any) {
    console.log(selectedData);

    this.meeting_point = selectedData.data.name;

    this.lat = selectedData.data.geometry.location.lat;
    this.lng = selectedData.data.geometry.location.lng;

    this.setURL(this.lat, this.lng)
     
    //do any necessery stuff.
}

setURL(lat,lng){
  this.url = 'https://maps.google.com/maps?q='+lat+','+lng+'&hl=es;z=14&amp&output=embed';

  return this.url;
}

  // var jual trip
  trip = {
    photo_trip : [],
    photo : ['../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png'],
  }

  


// validation function

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

  constructor( public router :Router, private appService: AppService, private fb:FormBuilder, public sanitizer: DomSanitizer ) {
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

   close() {
     this.imgError = true;
   }

   counter(i:Number) {
    return new Array(i);
  }

  selectDays(e) {
   this.daysLength = e.target.value;
  //  console.log(this.daysLength);

  //  console.log(this.myForm);
    if(this.myForm.controls.days.valid == false) {

      this.disableDate = true;
    } else if (this.myForm.controls.days.valid == true) {
      
      this.disableDate = false;
    }
  }

    // content2
    toggleJual():void {

        // console.log(this.myForm);

      if (this.myForm.controls.trip_name.valid && this.myForm.controls.id_type_trip.valid && this.myForm.controls.days.valid && this.myForm.controls.id_province_trip.valid && this.myForm.controls.id_category.valid ) {
        this.content1 = !this.content1;
         this.content2 = !this.content2;
      } else {
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

    // submit jual trip
   onSubmitTrip1() {

    this.myForm.value.time = this.myForm.value.jam + ':' + this.myForm.value.menit;
    
    this.myForm.value.latitude =this.lat;
    this.myForm.value.longitude = this.lng;
    this.myForm.value.meeting_point = this.meeting_point;

    console.log(this.myForm.value);

    if (this.myForm.valid) {

      this.appService.addTripProvider(this.myForm.value).subscribe(trip => {
       
        console.log(trip); 
     
     if(trip.status == 200) {
       this.successedTrip = true;
       this.content1 = !this.content1;
       this.content2 = !this.content2;
        
     }

   })

    } else {
      this.validateAllFormFields(this.myForm);
    }
        
   }


   //upload image

   uploadImage1(evt) {
    
    this.size = evt.target.files[0].size;
    this.type = evt.target.files[0].type;
    // console.log(this.size);

    if(this.type == 'image/png' || this.type == 'image/jpg' || this.type == 'image/jpeg') {

      let files = evt.target.files;
      let file = files[0];

    if (files && file) {
        let reader = new FileReader();

        reader.onload =this._handleReaderLoaded1.bind(this);

        reader.readAsBinaryString(file);
    }

    } else 

    {
      this.imgError = false;
    }

    
  }
  
  _handleReaderLoaded1(readerEvt) {
     let binaryString = readerEvt.target.result;
            this.myForm.value.photo_trip[0]= btoa(binaryString); 
            this.trip.photo[0]="data:image/jpeg;base64,"+ btoa(binaryString);       
    }

    uploadImage2(evt) {

      this.size = evt.target.files[0].size;
      this.type = evt.target.files[0].type;

      if(this.type == 'image/png' || this.type == 'image/jpg' || this.type == 'image/jpeg') {

        let files = evt.target.files;
        let file = files[0];
      
      if (files && file) {
          let reader = new FileReader();
  
          reader.onload =this._handleReaderLoaded2.bind(this);
  
          reader.readAsBinaryString(file);
      }
      
      }else 

      {
        this.imgError = false;
      }

    }
    
    _handleReaderLoaded2(readerEvt) {
       let binaryString = readerEvt.target.result;
       this.myForm.value.photo_trip[1]= btoa(binaryString); 
       this.trip.photo[1]="data:image/jpeg;base64,"+ btoa(binaryString);         
      }

      uploadImage3(evt) {

        this.size = evt.target.files[0].size;
        this.type = evt.target.files[0].type;

        if(this.type == 'image/png' || this.type == 'image/jpg' || this.type == 'image/jpeg') {

          let files = evt.target.files;
          let file = files[0];
        
        if (files && file) {
            let reader = new FileReader();
    
            reader.onload =this._handleReaderLoaded3.bind(this);
    
            reader.readAsBinaryString(file);
        }

        } else 

        {
          this.imgError = false;
        }
    }
    
    _handleReaderLoaded3(readerEvt) {
       let binaryString = readerEvt.target.result;
       this.myForm.value.photo_trip[2]= btoa(binaryString); 
       this.trip.photo[2]="data:image/jpeg;base64,"+ btoa(binaryString);          
      }

      uploadImage4(evt) {

        this.size = evt.target.files[0].size;
        this.type = evt.target.files[0].type;

        if(this.type == 'image/png' || this.type == 'image/jpg' || this.type == 'image/jpeg') {

          let files = evt.target.files;
          let file = files[0];
        
        if (files && file) {
            let reader = new FileReader();
    
            reader.onload =this._handleReaderLoaded4.bind(this);
    
            reader.readAsBinaryString(file);
        }

        } else 

        {
          this.imgError = false;
        }

      }
      
      _handleReaderLoaded4(readerEvt) {
         let binaryString = readerEvt.target.result;
         this.myForm.value.photo_trip[3]= btoa(binaryString); 
         this.trip.photo[3]="data:image/jpeg;base64,"+ btoa(binaryString);          
        }

        uploadImage5(evt) {

          this.size = evt.target.files[0].size;
          this.type = evt.target.files[0].type;

          if(this.type == 'image/png' || this.type == 'image/jpg' || this.type == 'image/jpeg') {

            let files = evt.target.files;
            let file = files[0];
          
          if (files && file) {
              let reader = new FileReader();
      
              reader.onload =this._handleReaderLoaded5.bind(this);
      
              reader.readAsBinaryString(file);
          }

          } else 

          {
            this.imgError = false;
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

          dateValue(event: IMyDateModel, num) {
            
            const dateArray = <FormArray>this.myForm.controls.date_trip;
            dateArray.push(new FormControl(event.jsdate));

            const consArr = <FormArray>this.myForm.controls.dateArr;
            consArr.push(new FormControl(event.date));

            // console.log(this.myForm.value.dateArr);

            this.daysRange = event.date.day + (parseInt(this.daysLength) - 1);
            // console.log(event.date.day);

            if(event.date.day == 0) {
             
              this.myDatePickerOptions = {
                disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate()-1}
              };

            }
            
            this.myDatePickerOptions = {
              disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.daysRange}
            };

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
