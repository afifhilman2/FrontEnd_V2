import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';


import { LandingPageRouterModule } from './landingpage-routing.module';
import { LandingpageComponent } from './landingpage.component';
import { MyDatePickerModule } from 'mydatepicker';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LandingPageRouterModule,
    MyDatePickerModule
  ],
  declarations: [
    LandingpageComponent,
   ],
 
})
export class LandingpageModule { }
