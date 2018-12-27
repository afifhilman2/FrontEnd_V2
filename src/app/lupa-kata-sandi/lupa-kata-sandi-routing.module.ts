import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LupaKataSandiComponent } from './lupa-kata-sandi.component';


const routes: Routes = [
  {
    path: '',
    component: LupaKataSandiComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LupaKataSandiRouterModule { }
