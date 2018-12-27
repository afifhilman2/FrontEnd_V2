import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtalaseTravelComponent } from './etalase-travel.component';


const routes: Routes = [
  {
    path: '',
    component: EtalaseTravelComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtalaseTravelRouterModule { }
