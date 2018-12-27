import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DaftarTravelComponent } from './daftar-travel.component';




const routes: Routes = [
  {
    path: '',
    component: DaftarTravelComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DaftarTravelRouterModule { }
