import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JualTripComponent} from '../jual-trip/jual-trip.component';
import { JualTripContentComponent } from '.././jual-trip-content/jual-trip-content.component';
import { JualTripContent2Component } from '.././jual-trip-content2/jual-trip-content2.component';
import { EtalaseTravelComponent } from '.././etalase-travel/etalase-travel.component';
import { SaldoComponent } from '.././saldo/saldo.component';
import { UbahProfilTravelComponent } from '.././ubah-profil-travel/ubah-profil-travel.component';
import { TransaksiPenjualanComponent } from '.././transaksi-penjualan/transaksi-penjualan.component';
import { DaftarPemesanComponent } from '.././daftar-pemesan/daftar-pemesan.component';

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
        // MiniFooterComponent,
    ]

})

export class JualTripModule {} 