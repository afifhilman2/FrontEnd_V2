import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingUlasanComponent } from './rating-ulasan.component';




const routes: Routes = [
  {
    path: '',
    component: RatingUlasanComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingUlasanRouterModule { }
