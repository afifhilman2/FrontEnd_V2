import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JualTripContentComponent } from './jual-trip-content.component';



const routes: Routes = [
  {
    
    path:'', component:JualTripContentComponent 
     
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JualTripContentRouterModule { }
