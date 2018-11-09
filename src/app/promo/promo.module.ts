import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { PromoRouterModule } from './promo-routing.module';
import { PromoComponent } from './promo.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PromoRouterModule
  ],
  declarations: [ 
    PromoComponent
   ],
 
})
export class PromoModule { }
