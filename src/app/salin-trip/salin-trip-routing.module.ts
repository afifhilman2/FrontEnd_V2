import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalinTripComponent } from './salin-trip.component';




const routes: Routes = [
  {
    path: '',
    component: SalinTripComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalinTripRouterModule { }
