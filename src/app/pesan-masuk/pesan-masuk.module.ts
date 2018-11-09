import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { PesanMasukRouterModule } from './pesan-masuk-routing.module';
import { PesanMasukComponent } from './pesan-masuk.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PesanMasukRouterModule
  ],
  declarations: [ 
    PesanMasukComponent
   ],
 
})
export class PesanMasukModule { }
