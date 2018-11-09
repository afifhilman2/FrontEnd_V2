import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { LupaKataSandiRouterModule } from './lupa-kata-sandi-routing.module';
import { LupaKataSandiComponent } from './lupa-kata-sandi.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LupaKataSandiRouterModule
  ],
  declarations: [ 
    LupaKataSandiComponent
   ],
 
})
export class LupaKataSandiModule { }
