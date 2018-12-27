import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';


import { DaftarPemesanRouterModule } from './daftar-pemesan-routing.module';
import { DaftarPemesanComponent } from './daftar-pemesan.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DaftarPemesanRouterModule
  ],
  declarations: [ 
    DaftarPemesanComponent
   ],
 
})
export class DaftarPemesanModule { }
