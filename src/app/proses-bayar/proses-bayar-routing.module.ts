import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProsesBayarComponent } from './proses-bayar.component';




const routes: Routes = [
  {
    path: '',
    component: ProsesBayarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProsesBayarRouterModule { }
