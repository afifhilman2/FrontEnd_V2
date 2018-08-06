import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
// import { } from 'googlemaps';
// import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {Router} from "@angular/router";
import { AppService} from '../app.service';

@Component({
  selector: 'app-jual-trip-content',
  templateUrl: './jual-trip-content.component.html',
  styleUrls: ['./jual-trip-content.component.css']
})
export class JualTripContentComponent implements OnInit {

  successedTrip:boolean = false;
  content1:boolean = true;
  content2:boolean = false;

  // content2
  // public searchControl: FormControl;
  // latitude =-6.104273;
  // longitude=106.776137;

  // @ViewChild("search")
  // public searchElementRef: ElementRef;


  toggleJual():void {
    this.content1 = !this.content1;
    this.content2 = !this.content2;
  }

  categoryTrip:any[];
  provinceTrip:any[];
  typeTrip:any[];

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
    id_category : '',
    other_category : [], 
    id_facility : '', 
    id_status_trip : '',
    id_location : '', 
    publish_price_group : '', 
    service_fee_group : '', 
    photo_trip : [],
    fixed_price_grorup : '', 
  }

  constructor(private ngZone: NgZone, public router :Router, private appService: AppService ) {
    this.appService.getCategoryTrip().subscribe( category => {
      this.categoryTrip = category.data;
    });

    this.appService.getProvinceTrip().subscribe( province => {
      this.provinceTrip = province.data;
    })
   }

   onSubmitTrip1() {
     this.appService.addTripProvider(this.trip).subscribe(trip => {
       console.log(trip);

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
          }

          // end upload image


      onSelectDuration(e) {
        this.trip.days = e.target.value;
      }

      onSelectCategory(e) {
        this.trip.id_category = e.target.value;
      }

      onSelectProvince(e) {
        this.trip.id_location = e.target.value;
      }

      onRadioType(event :any) {
        this.trip.id_type_trip = event.target.value;  
      }

  ngOnInit() {
    // this.latitude = -6.104273;
    // this.longitude = 106.776137;

    // this.searchControl = new FormControl();
     //set current position
    //  this.setCurrentPosition();
    
     //load Places Autocomplete
    //  this.mapsAPILoader.load().then(() => {
    //    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //      types: ["address"]
    //    });
      //  autocomplete.addListener("place_changed", () => {
      //    this.ngZone.run(() => {
           //get the place result
          //  let place: google.maps.places.PlaceResult = autocomplete.getPlace();
   
          //  //verify result
          //  if (place.geometry === undefined || place.geometry === null) {
          //    return;
          //  }
           
           //set latitude, longitude and zoom
  //          this.latitude = place.geometry.location.lat();
  //          this.longitude = place.geometry.location.lng();
  //        });
  //      });
  //    });
  // }

//   private setCurrentPosition() {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         this.latitude = position.coords.latitude;
//         this.longitude = position.coords.longitude;
//       });
//     }
 }

}
