import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbahProfilComponent } from './ubah-profil.component';


const routes: Routes = [
  {
    path: '',
    component: UbahProfilComponent
    ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbahProfilRouterModule { }
