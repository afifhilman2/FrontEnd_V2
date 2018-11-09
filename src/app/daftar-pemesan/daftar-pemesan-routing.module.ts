import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaftarPemesanComponent } from './daftar-pemesan.component';




const routes: Routes = [
  {
    path: '',
    component: DaftarPemesanComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DaftarPemesanRouterModule { }
