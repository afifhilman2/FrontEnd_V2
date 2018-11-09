import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { EksternalRouterModule } from './eksternal-routing.module';
import { EksternalComponent } from './eksternal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EksternalRouterModule
  ],
  declarations: [ 
    EksternalComponent
   ],
 
})
export class EksternalModule { }
