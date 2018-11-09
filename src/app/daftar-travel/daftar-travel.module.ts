import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { DaftarTravelRouterModule } from './daftar-travel-routing.module';
import { DaftarTravelComponent } from './daftar-travel.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DaftarTravelRouterModule
  ],
  declarations: [ 
    DaftarTravelComponent
   ],
 
})
export class DaftarTravelModule { }
