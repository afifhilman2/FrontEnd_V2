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
  
    
      // {   path:'Akun', loadChildren:'./trv-sidebar/trv-sidebar-module#TrvSidebarModule'},
      // { path: 'DetailPaket/:id', loadChildren: '../detail-paket/detail-paket.module#DetailPaketModule'},
      {
        path:'', component:TrvSidebarComponent,
        children:
        [
            // { path:'', redirectTo: 'Profile', pathMatch: 'prefix'},
            { path:'Profile', loadChildren:'../ubah-profil/ubah-profil.module#UbahProfilModule'},
            { path:'Pemesanan', loadChildren:'../pemesanan/pemesanan.module#PemesananModule'},
            { path:'Favorit', loadChildren:'../favorit-user/favorit-user.module#FavoritUserModule'},
            { path:'PesanMasuk', loadChildren:'../pesan-masuk/pesan-masuk.module#PesanMasukModule'},
            { path:'DiskusiTrip', loadChildren:'../diskusi-trip/diskusi-trip.module#DiskusiTripModule'},
            { path:'Promo', loadChildren:'../promo/promo.module#PromoModule'},
            { path:'Ulasan', loadChildren:'../rating-ulasan/rating-ulasan.module#RatingUlasanModule'},
            { path:'isiDataPeserta', loadChildren:'../isi-data-peserta/isi-data-peserta.module#IsiDataPesertaModule'},

        ]
      }
      
    ]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrvSidebarRoterModule { }
