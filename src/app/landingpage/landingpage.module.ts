import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';


import { LandingPageRouterModule } from './landingpage-routing.module';
import { LandingpageComponent } from './landingpage.component';
import { HeaderComponent } from '../header/header.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LandingPageRouterModule,
  ],
  declarations: [
    LandingpageComponent,
    // HeaderComponent,
   ],
 
})
export class LandingpageModule { }
