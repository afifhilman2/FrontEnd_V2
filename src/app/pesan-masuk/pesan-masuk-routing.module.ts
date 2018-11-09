import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesanMasukComponent } from './pesan-masuk.component';


const routes: Routes = [
  {
    path: '',
    component: PesanMasukComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PesanMasukRouterModule { }
