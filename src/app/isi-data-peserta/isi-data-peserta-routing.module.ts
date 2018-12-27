import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsiDataPesertaComponent } from './isi-data-peserta.component';


const routes: Routes = [
  {
    path: '',
    component: IsiDataPesertaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IsiDataPesertaRouterModule { }
