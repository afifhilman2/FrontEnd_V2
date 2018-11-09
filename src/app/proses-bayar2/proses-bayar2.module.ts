import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';


import { ProsesBayar2Component } from './proses-bayar2.component';
import { ProsesBayar2RouterModule } from './proses-bayar2-routing.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProsesBayar2RouterModule
  ],
  declarations: [ 
    ProsesBayar2Component
   ],
 
})
export class ProsesBayar2Module { }
