import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { DetailPaketRouterModule } from './detail-paket-routing.module';
import { DetailPaketComponent } from './detail-paket.component';
import { AgmCoreModule } from '@agm/core';
import { MyDatePickerModule } from 'mydatepicker';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    DetailPaketRouterModule,
    MyDatePickerModule,
  ],
  declarations: [
    DetailPaketComponent,
   ],
 
})
export class DetailPaketModule { }
