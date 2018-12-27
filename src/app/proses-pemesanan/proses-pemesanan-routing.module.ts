import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ProsesPemesananComponent } from './proses-pemesanan.component';




const routes: Routes = [
  {
    path: '',
    component: ProsesPemesananComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProsesPemesananRouterModule { }
