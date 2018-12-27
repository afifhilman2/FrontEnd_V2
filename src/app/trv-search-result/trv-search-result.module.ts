import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';



import { MyDatePickerModule } from 'mydatepicker';

import { TrvSearchResultRouterModule } from './trv-search-result-routing.module';
import { TrvSearchResultComponent } from './trv-search-result.component';
import { FilterPipe } from './filter.pipe';



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
    FilterPipe
   ],

 
})
export class TrvSearchResultModule { }
