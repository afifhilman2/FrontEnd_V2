import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';


import { TrvSidebarRoterModule } from './trv-sidebar-routing.module';

import { HeaderComponent } from '../header/header.component';
import { UbahProfilComponent } from '../ubah-profil/ubah-profil.component';
import { PemesananComponent } from '../pemesanan/pemesanan.component';
import { FavoritUserComponent } from '../favorit-user/favorit-user.component';
import { PesanMasukComponent } from '../pesan-masuk/pesan-masuk.component';
import { DiskusiTripComponent } from '../diskusi-trip/diskusi-trip.component';
import { PromoComponent } from '../promo/promo.component';
import { RatingUlasanComponent } from '../rating-ulasan/rating-ulasan.component';
import { IsiDataPesertaComponent } from '../isi-data-peserta/isi-data-peserta.component';
import { TrvSidebarComponent } from './trv-sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { DetailPaketModule } from '../detail-paket/detail-paket.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrvSidebarRoterModule,
  ],
  declarations: [ 
    TrvSidebarComponent,
    FooterComponent,
   ],
 
})
export class TrvSidebarModule { }
