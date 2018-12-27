import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';
import { PemesananRouterModule } from './pemesanan-routing.module';
import { PemesananComponent } from './pemesanan.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PemesananRouterModule
  ],
  declarations: [ 
    PemesananComponent
   ],
 
})
export class PemesananModule { }
