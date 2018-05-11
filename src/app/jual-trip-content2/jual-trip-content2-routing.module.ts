import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JualTripContent2Component } from './jual-trip-content2.component';

const routes: Routes = [
  {
    path: '',
    component: JualTripContent2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JualTripContent2RoutingModule { }
