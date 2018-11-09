import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';
import { JualTripContent2RouterModule } from './jual-trip-content2-routing.module';
import { JualTripContent2Component } from './jual-trip-content2.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JualTripContent2RouterModule,
    MyDatePickerModule,
    Ng4GeoautocompleteModule.forRoot(),
  ],
  declarations: [
    JualTripContent2Component,
   ],
 
})
export class JualTripContent2Module { }
