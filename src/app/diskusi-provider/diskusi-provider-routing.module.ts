import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiskusiProviderComponent } from './diskusi-provider.component';

const routes: Routes = [
  {
    path: '',
    component: DiskusiProviderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiskusiProvideRouterModule { }
