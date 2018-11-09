import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';

import { JualTripComponent } from ".././jual-trip/jual-trip.component";
// import { JualTripContentComponent } from ".././jual-trip-content/jual-trip-content.component";
import { SaldoComponent } from ".././saldo/saldo.component";
import { TransaksiPenjualanComponent } from ".././transaksi-penjualan/transaksi-penjualan.component";
import { UbahProfilTravelComponent } from ".././ubah-profil-travel/ubah-profil-travel.component";
import { DaftarTripComponent } from ".././daftar-trip/daftar-trip.component";
import { JualTripContent2Component } from ".././jual-trip-content2/jual-trip-content2.component";
import { EtalaseTravelComponent } from ".././etalase-travel/etalase-travel.component";
import { SalinTripComponent } from '.././salin-trip/salin-trip.component';
import { PesanMasukProviderComponent } from '.././pesan-masuk-provider/pesan-masuk-provider.component';
import { DiskusiProviderComponent } from '.././diskusi-provider/diskusi-provider.component';

import { DaftarPemesanComponent } from '.././daftar-pemesan/daftar-pemesan.component';
import { DaftarPemesanPrivateComponent } from '.././daftar-pemesan-private/daftar-pemesan-private.component';
import { HeaderProviderComponent } from ".././header-provider/header-provider.component";

const JualTrip: Routes = [
    // {
    //     path: '', 
    //     component: HeaderProviderComponent,
    //     children :[
            {
                path:'',
                component:JualTripComponent,
                children:[
                    {
                        path:'',
                        redirectTo: 'JualTrip', pathMatch: 'prefix',
                    },
                    {   path:'Saldo', 
                        loadChildren:'../saldo/saldo.module#SaldoModule'
                    },
                    {   path:'JualTrip', 
                        loadChildren:'../jual-trip-content/jual-trip-content.module#JualTripContentModule'
                    },
                    {   path:'TransaksiPenjualan', 
                        loadChildren:'../transaksi-penjualan/transaksi-penjualan.module#TransaksiPenjualanModule'
                    },
                    {   path:'DaftarPemesanan/:id', 
                        loadChildren:'../daftar-pemesan/daftar-pemesan.module#DaftarPemesanModule'
                    },
                    {   path:'DaftarPemesananPrivate/:id', 
                        loadChildren:'../daftar-pemesan-private/daftar-pemesan-private.module#DaftarPemesanPrivateModule'
                    },
                    {   path:'UbahProfilTravel', 
                        loadChildren:'../ubah-profil-travel/ubah-profil-travel.module#UbahProfilTravelModule'
                    },
                    {   path:'DaftarTrip', 
                        loadChildren:'../daftar-trip/daftar-trip.module#DaftarTripModule'
                    },
                    {   path:'UbahTrip/:id', 
                        loadChildren: '../jual-trip-content2/jual-trip-content2.module#JualTripContent2Module'
                    },
                    {   path:'SalinTrip/:id', 
                        loadChildren:'../salin-trip/salin-trip.module#SalinTripModule'
                    },
                    {   path:'PesanMasuk', 
                        loadChildren: '../pesan-masuk-provider/pesan-masuk-provider.module#PesanMasukProviderModule'
                    },
                    {   path:'DiskusiProvider', 
                        loadChildren:'../diskusi-provider/diskusi-provider.module#DiskusiProviderModule'
                    },
                ]
            },
            {   path:'EtalaseTravel/:id', 
                loadChildren:'../etalase-travel/etalase-travel.module#EtalaseTravelModule',
            }

    //     ]
    // }
]


@NgModule({
    imports: [RouterModule.forChild(JualTrip)],
    exports: [RouterModule]
  })
  export class JualTripRouterModule { }