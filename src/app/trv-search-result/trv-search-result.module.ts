import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';



import { MyDatePickerModule } from 'mydatepicker';

import { TrvSearchResultRouterModule } from './trv-search-result-routing.module';
import { TrvSearchResultComponent } from './trv-search-result.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrvSearchResultRouterModule,
    MyDatePickerModule
  ],
  declarations: [
    TrvSearchResultComponent,
   ],
 
})
export class TrvSearchResultModule { }
