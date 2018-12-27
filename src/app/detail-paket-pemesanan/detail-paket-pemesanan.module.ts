import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';


import { AgmCoreModule } from '@agm/core';
import { MyDatePickerModule } from 'mydatepicker';
import { DetailPaketPemesananRouterModule } from './detail-paket-pemesanan-routing.module';
import { DetailPaketPemesananComponent } from './detail-paket-pemesanan.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    DetailPaketPemesananRouterModule,
    MyDatePickerModule,
  ],
  declarations: [
    DetailPaketPemesananComponent,
   ],
 
})
export class DetailPaketPemesananModule { }
