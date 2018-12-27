import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';


import { TransaksiPenjualanRouterModule } from './transaksi-penjualan-routing.module';
import { TransaksiPenjualanComponent } from './transaksi-penjualan.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TransaksiPenjualanRouterModule
  ],
  declarations: [ 
    TransaksiPenjualanComponent
   ],
 
})
export class TransaksiPenjualanModule { }
