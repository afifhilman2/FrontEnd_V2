import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DaftarTripComponent } from './daftar-trip.component';




const routes: Routes = [
  {
    path: '',
    component: DaftarTripComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DaftarTripRouterModule { }
