import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiskusiTripComponent } from './diskusi-trip.component';

const routes: Routes = [
  {
    path: '',
    component: DiskusiTripComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiskusiTripRouterModule { }
