import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DaftarPemesanPrivateComponent } from './daftar-pemesan-private.component';




const routes: Routes = [
  {
    path: '',
    component: DaftarPemesanPrivateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DaftarPemesanPrivateRouterModule { }
