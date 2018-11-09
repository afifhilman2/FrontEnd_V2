import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';


import { RatingUlasanRouterModule } from './rating-ulasan-routing.module';
import { RatingUlasanComponent } from './rating-ulasan.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RatingUlasanRouterModule
  ],
  declarations: [ 
    RatingUlasanComponent
   ],
 
})
export class RatingUlasanModule { }
