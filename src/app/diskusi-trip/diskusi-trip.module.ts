import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { DiskusiTripRouterModule } from './diskusi-trip-routing.module';
import { DiskusiTripComponent } from './diskusi-trip.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DiskusiTripRouterModule
  ],
  declarations: [ 
    DiskusiTripComponent
   ],
 
})
export class DiskusiTripModule { }
