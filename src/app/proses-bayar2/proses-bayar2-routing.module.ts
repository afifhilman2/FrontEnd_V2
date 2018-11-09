import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProsesBayar2Component } from './proses-bayar2.component';




const routes: Routes = [
  {
    path: '',
    component: ProsesBayar2Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProsesBayar2RouterModule { }
