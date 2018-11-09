import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';



import { MyDatePickerModule } from 'mydatepicker';
import { JualTripContentRouterModule } from './jual-trip-content-routing.module';
import { JualTripContentComponent } from './jual-trip-content.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JualTripContentRouterModule,
    MyDatePickerModule,
    Ng4GeoautocompleteModule.forRoot()
  ],
  declarations: [
    JualTripContentComponent,
   ],
 
})
export class JualTripContentModule { }
