import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { } from 'googlemaps';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-jual-trip-content2',
  templateUrl: './jual-trip-content2.component.html',
  styleUrls: ['./jual-trip-content2.component.css']
})
export class JualTripContent2Component implements OnInit {

  jual1:boolean = false;
  jual2:boolean = true;

  public searchControl: FormControl;
  latitude =-6.104273;
  longitude=106.776137;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  toggleJual():void {
    this.jual1 = !this.jual1;
    this.jual2 = !this.jual2;
  }
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {

    this.latitude = -6.104273;
    this.longitude = 106.776137;

    this.searchControl = new FormControl();
     //set current position
     this.setCurrentPosition();
    
     //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
       let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
         types: ["address"]
       });
       autocomplete.addListener("place_changed", () => {
         this.ngZone.run(() => {
           //get the place result
           let place: google.maps.places.PlaceResult = autocomplete.getPlace();
   
           //verify result
           if (place.geometry === undefined || place.geometry === null) {
             return;
           }
           
           //set latitude, longitude and zoom
           this.latitude = place.geometry.location.lat();
           this.longitude = place.geometry.location.lng();
         });
       });
     });
   }
   
   private setCurrentPosition() {
     if ("geolocation" in navigator) {
       navigator.geolocation.getCurrentPosition((position) => {
         this.latitude = position.coords.latitude;
         this.longitude = position.coords.longitude;
       });
     }
  }

}
