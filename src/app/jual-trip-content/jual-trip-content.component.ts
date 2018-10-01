import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';

import {Router} from "@angular/router";
import { AppService} from '../app.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-jual-trip-content',
  templateUrl: './jual-trip-content.component.html',
  styleUrls: ['./jual-trip-content.component.css']
})
export class JualTripContentComponent implements OnInit {

  successedTrip:boolean = false;
  content1:boolean = true;
  content2:boolean = false;

  opentrip:boolean = true;
  privatetrip:boolean = false;
  d: Date = new Date();

  categoryTrip:any[];
  provinceTrip:any[];
  typeTrip:any[];
  facilityTrip:any[];
  service:any;
  publish:any;
  fixed:any;
  days:any;
  idTypeOpen:any;
  idTypePrivate:any;


  myForm = this.fb.group({
    trip_name : ['', Validators.required], 
    id_type_trip :['', Validators.required], 
    days : ['', Validators.required],
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
    publish_price_group : '', 
    service_fee_group : '', 
    zone_time:'WIB',
    time:'',

  })


  // var jual trip
  trip = {
    photo_trip : [],
    photo : ['../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png','../assets/img/add.png'],
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
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });

      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }




  constructor( public router :Router, private appService: AppService, private fb:FormBuilder ) {
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

   counter(i:Number) {
    return new Array(i);
  }

    // content2
    toggleJual():void {

      if (this.myForm.valid) {
        this.content1 = !this.content1;
         this.content2 = !this.content2;
      } else {
        this.validateAllFormFields(this.myForm);
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

    // submit jual trip
   onSubmitTrip1() {

        this.appService.addTripProvider(this.myForm.value).subscribe(trip => {
       
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
            this.trip.photo_trip[0]= btoa(binaryString); 
            this.trip.photo[0]="data:image/jpeg;base64,"+ btoa(binaryString);       
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
       this.trip.photo_trip[1]= btoa(binaryString); 
       this.trip.photo[1]="data:image/jpeg;base64,"+ btoa(binaryString);         
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
       this.trip.photo_trip[2]= btoa(binaryString); 
       this.trip.photo[2]="data:image/jpeg;base64,"+ btoa(binaryString);          
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
         this.trip.photo_trip[3]= btoa(binaryString); 
         this.trip.photo[3]="data:image/jpeg;base64,"+ btoa(binaryString);          
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
           this.trip.photo_trip[4]= btoa(binaryString); 
           this.trip.photo[4]="data:image/jpeg;base64,"+ btoa(binaryString);         
          }
          // end upload image

          checked(e,i) {
            const facilityArray = <FormArray>this.myForm.controls.id_facility; 
                    
            if(e.target.checked) {
              facilityArray.push(new FormControl(i));
            }
            else  {
              let index = facilityArray.controls.findIndex(x=> x.value == i)
              facilityArray.removeAt(index);
            }

          }

          dateValue(event: IMyDateModel) {

            const dateArray = <FormArray>this.myForm.controls.date_trip;
            dateArray.push(new FormControl(event.jsdate));
          }

  ngOnInit() {

    this.myForm.patchValue({
      id_type_trip:this.idTypeOpen
    });

    }

}
