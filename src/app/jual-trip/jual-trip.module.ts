import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyDatePickerModule } from 'mydatepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JualTripComponent} from '../jual-trip/jual-trip.component';
import { JualTripContentComponent } from '.././jual-trip-content/jual-trip-content.component';
import { JualTripContent2Component } from '.././jual-trip-content2/jual-trip-content2.component';
import { EtalaseTravelComponent } from '.././etalase-travel/etalase-travel.component';
import { SaldoComponent } from '.././saldo/saldo.component';
import { UbahProfilTravelComponent } from '.././ubah-profil-travel/ubah-profil-travel.component';
import { TransaksiPenjualanComponent } from '.././transaksi-penjualan/transaksi-penjualan.component';
import { DaftarPemesanComponent } from '.././daftar-pemesan/daftar-pemesan.component';
import { SalinTripComponent } from '.././salin-trip/salin-trip.component';
import { PesanMasukProviderComponent } from '.././pesan-masuk-provider/pesan-masuk-provider.component';
import { DiskusiProviderComponent } from '.././diskusi-provider/diskusi-provider.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { AgmCoreModule } from '@agm/core';
import { DaftarPemesanPrivateComponent } from '.././daftar-pemesan-private/daftar-pemesan-private.component';
import { HeaderProviderComponent } from ".././header-provider/header-provider.component";

// import { MiniFooterComponent } from '.././mini-footer/mini-footer.component';
import {JualTripRouting } from '../jual-trip/jual-trip.routing';


@NgModule ({

    imports:[
        JualTripRouting,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MyDatePickerModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBClUZWzmnXM-51wYSX22_lI2dBouzEDXM'
          }),
        Ng4GeoautocompleteModule.forRoot(),
    ],

    declarations:[
        JualTripComponent,
        JualTripContentComponent,
        JualTripContent2Component,
        SaldoComponent,
        UbahProfilTravelComponent,
        TransaksiPenjualanComponent,
        EtalaseTravelComponent,
        DaftarPemesanComponent,
        SalinTripComponent,
        PesanMasukProviderComponent,
        DiskusiProviderComponent,
        DaftarPemesanPrivateComponent,
        HeaderProviderComponent
        // MiniFooterComponent,
    ]

})

export class JualTripModule {} 