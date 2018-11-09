import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EksternalComponent } from './eksternal.component';


const routes: Routes = [
  {
    path: '',
    component: EksternalComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EksternalRouterModule { }
