import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { TrvSidebarComponent } from './trv-sidebar.component';
import { UbahProfilComponent } from '../ubah-profil/ubah-profil.component';
import { PemesananComponent } from '../pemesanan/pemesanan.component';
import { FavoritUserComponent } from '../favorit-user/favorit-user.component';
import { PesanMasukComponent } from '../pesan-masuk/pesan-masuk.component';
import { DiskusiTripComponent } from '../diskusi-trip/diskusi-trip.component';
import { PromoComponent } from '../promo/promo.component';
import { RatingUlasanComponent } from '../rating-ulasan/rating-ulasan.component';
import { IsiDataPesertaComponent } from '../isi-data-peserta/isi-data-peserta.component';



const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children:[
      // {   path:'Akun', loadChildren:'./trv-sidebar/trv-sidebar-module#TrvSidebarModule'},
      // { path: 'DetailPaket/:id', loadChildren: '../detail-paket/detail-paket.module#DetailPaketModule'},
      {
        path:'Akun', component:TrvSidebarComponent,
        children:
        [
            { path:'Profile', component: UbahProfilComponent},
            { path:'Pemesanan', component:PemesananComponent},
            { path:'Favorit', component:FavoritUserComponent},
            { path:'PesanMasuk', component:PesanMasukComponent},
            { path:'DiskusiTrip', component:DiskusiTripComponent},
            { path:'Promo', component:PromoComponent},
            { path:'Ulasan', component:RatingUlasanComponent},
            { path:'isiDataPeserta', component:IsiDataPesertaComponent},

        ]
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrvSidebarRoterModule { }
