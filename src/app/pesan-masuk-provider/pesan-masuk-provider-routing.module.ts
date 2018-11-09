import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesanMasukProviderComponent } from './pesan-masuk-provider.component';




const routes: Routes = [
  {
    path: '',
    component: PesanMasukProviderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PesanMasukProviderRouterModule { }
