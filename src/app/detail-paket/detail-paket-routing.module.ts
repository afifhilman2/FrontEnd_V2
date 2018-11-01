import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailPaketComponent } from './detail-paket.component';
// import { RegisterComponent } from './register.component';
// import { HeaderNologinComponent } from '../header-nologin/header-nologin.component';

const routes: Routes = [
  {
    path: '',
    component: DetailPaketComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailPaketRouterModule { }
