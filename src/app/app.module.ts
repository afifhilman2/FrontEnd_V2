import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';


import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { HeaderComponent } from './header/header.component';
import { PemesananComponent } from './pemesanan/pemesanan.component';
import { HeaderUserComponent } from './header-user/header-user.component';
import { SidebarAkunProfilComponent } from './sidebar-akun-profil/sidebar-akun-profil.component';
import { FooterComponent } from './footer/footer.component';
import { EksternalComponent } from './eksternal/eksternal.component';
import { LupaKataSandiComponent } from './lupa-kata-sandi/lupa-kata-sandi.component';
import { UbahKataSandiComponent } from './ubah-kata-sandi/ubah-kata-sandi.component';
import { LoginpageComponent } from "./loginpage/loginpage.component";
import { FavoritUserComponent } from './favorit-user/favorit-user.component';
import { TrvSidebarComponent } from './trv-sidebar/trv-sidebar.component';
import { TrvSearchResultComponent } from './trv-search-result/trv-search-result.component';

// import { EtalaseTravelComponent } from './etalase-travel/etalase-travel.component';
import { DaftarTravelComponent } from './daftar-travel/daftar-travel.component';
// import { JualTripComponent } from './jual-trip/jual-trip.component';
// import { JualTripContentComponent } from './jual-trip-content/jual-trip-content.component';
// import { JualTripContent2Component } from './jual-trip-content2/jual-trip-content2.component';


import { AuthService } from './token/auth.service';
import { DataService} from './data.service';
import { GuardService } from './guard.service';
import { routes } from './app.route';
import { AppService } from './app.service';


// import { SaldoComponent } from './saldo/saldo.component';
import { DaftarTripComponent } from './daftar-trip/daftar-trip.component';
// import { UbahProfilTravelComponent } from './ubah-profil-travel/ubah-profil-travel.component';
// import { TransaksiPenjualanComponent } from './transaksi-penjualan/transaksi-penjualan.component';
// import { DaftarPemesanComponent } from './daftar-pemesan/daftar-pemesan.component';
import { DetailPaketComponent } from './detail-paket/detail-paket.component';
import { UbahProfilComponent } from './ubah-profil/ubah-profil.component';
import { ProsesBayarComponent } from './proses-bayar/proses-bayar.component';
import { ProsesBayar2Component } from './proses-bayar2/proses-bayar2.component';
import { ProsesPemesananComponent } from './proses-pemesanan/proses-pemesanan.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RegisterComponent } from './register/register.component';
import { PesanMasukComponent } from './pesan-masuk/pesan-masuk.component';
import { DiskusiTripComponent } from './diskusi-trip/diskusi-trip.component';
import { HeaderNologinComponent } from './header-nologin/header-nologin.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SearchFilterPipe } from './header/search-pipe';
import { ClickOutsideDirective } from './header/directive-dropdown';
import { MiniFooterComponent } from './mini-footer/mini-footer.component';
import { LoaderComponent } from './loader/loader.component';
import {LoaderService} from './loader/loader-service';

import { TrvSearchNavbarModule } from './trv-search-navbar/trv-search-navbar.module';
import {JualTripModule} from './jual-trip/jual-trip.module';



@NgModule({
  declarations: [
    AppComponent,
    EksternalComponent,
    LandingpageComponent,
    HeaderComponent,
    PemesananComponent,
    HeaderUserComponent,
    SidebarAkunProfilComponent,
    FooterComponent,
    LupaKataSandiComponent,
    UbahKataSandiComponent,
    LoginpageComponent,
    FavoritUserComponent,
    TrvSidebarComponent,
    TrvSearchResultComponent,
    // TrvSearchNavbarComponent,
    // EtalaseTravelComponent,
    DaftarTravelComponent,
    // JualTripComponent,
    // JualTripContentComponent,
    // JualTripContent2Component,
    // SaldoComponent,
    DaftarTripComponent,
    // UbahProfilTravelComponent,
    // TransaksiPenjualanComponent,
    // DaftarPemesanComponent,
    DetailPaketComponent,
    UbahProfilComponent,
    ProsesBayarComponent,
    ProsesBayar2Component,
    ProsesPemesananComponent,
    CalendarComponent,
    RegisterComponent,
    PesanMasukComponent,
    DiskusiTripComponent,
    HeaderNologinComponent,
    SearchFilterPipe,
    ClickOutsideDirective,
    MiniFooterComponent,
    LoaderComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    // MatInputModule,
    // ReactiveFormsModule,
    // MatAutocompleteModule,
    BrowserAnimationsModule,
    TrvSearchNavbarModule,
    JualTripModule,
   
    RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: PreloadAllModules }),
  
    
  ],
  providers: [AppService, DataService, AuthService, GuardService, DatePipe, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
