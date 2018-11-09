import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { TransaksiPenjualanComponent } from './transaksi-penjualan.component';


const routes: Routes = [
  {
    path: '',
    component: TransaksiPenjualanComponent
    ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaksiPenjualanRouterModule { }
