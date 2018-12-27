import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';



import { MyDatePickerModule } from 'mydatepicker';

import { SalinTripRouterModule } from './salin-trip-routing.module';
import { SalinTripComponent } from './salin-trip.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { Ng2ImgMaxModule } from 'ng2-img-max';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SalinTripRouterModule,
    MyDatePickerModule,
    Ng2ImgMaxModule,
    Ng4GeoautocompleteModule.forRoot()
  ],
  declarations: [
    SalinTripComponent,
   ],
 
})
export class SalinTripModule { }
