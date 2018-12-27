import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailPaketPemesananComponent } from './detail-paket-pemesanan.component';
// import { DetailPaketComponent } from './detail-paket.component';
// import { RegisterComponent } from './register.component';
// import { HeaderNologinComponent } from '../header-nologin/header-nologin.component';

const routes: Routes = [
  {
    path: '',
    component: DetailPaketPemesananComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailPaketPemesananRouterModule { }
