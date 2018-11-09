import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { DaftarTripRouterModule } from './daftar-trip-routing.module';
import { DaftarTripComponent } from './daftar-trip.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DaftarTripRouterModule
  ],
  declarations: [ 
    DaftarTripComponent
   ],
 
})
export class DaftarTripModule { }
