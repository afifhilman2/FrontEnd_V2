import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';



import { MyDatePickerModule } from 'mydatepicker';

import { SalinTripRouterModule } from './salin-trip-routing.module';
import { SalinTripComponent } from './salin-trip.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SalinTripRouterModule,
    MyDatePickerModule
  ],
  declarations: [
    SalinTripComponent,
   ],
 
})
export class SalinTripModule { }
