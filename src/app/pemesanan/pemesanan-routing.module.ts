import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PemesananComponent } from './pemesanan.component';


const routes: Routes = [
  {
    path: '',
    component: PemesananComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PemesananRouterModule { }
