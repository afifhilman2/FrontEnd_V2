import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UbahProfilTravelComponent } from './ubah-profil-travel.component';


const routes: Routes = [
  {
    path: '',
    component: UbahProfilTravelComponent
    ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbahProfilTravelRouterModule { }
