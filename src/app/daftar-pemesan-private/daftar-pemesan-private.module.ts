import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { DaftarPemesanPrivateRouterModule } from './daftar-pemesan-private-routing.module';
import { DaftarPemesanPrivateComponent } from './daftar-pemesan-private.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DaftarPemesanPrivateRouterModule
  ],
  declarations: [ 
    DaftarPemesanPrivateComponent
   ],
 
})
export class DaftarPemesanPrivateModule { }
