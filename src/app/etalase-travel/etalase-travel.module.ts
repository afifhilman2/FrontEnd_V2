import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { EtalaseTravelComponent } from './etalase-travel.component';
import { EtalaseTravelRouterModule } from './etalase-travel-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EtalaseTravelRouterModule,
    
  ],
  declarations: [ 
    EtalaseTravelComponent
   ],
 
})
export class EtalaseTravelModule { }
