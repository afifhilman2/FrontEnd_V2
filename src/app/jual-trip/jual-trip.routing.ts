import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JualTripComponent } from ".././jual-trip/jual-trip.component";
import { JualTripContentComponent } from ".././jual-trip-content/jual-trip-content.component";
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
    {
        path: '', 
        component: HeaderProviderComponent,
        children :[
            {
                path:'JualTrip',
                component:JualTripComponent,
                children:[
                    {
                        path:'',
                        component:JualTripContentComponent,
                    },
                    {   path:'Saldo', 
                        component:SaldoComponent
                    },
                    {   path:'JualTrip', 
                        component:JualTripContentComponent
                    },
                    {   path:'TransaksiPenjualan', 
                        component:TransaksiPenjualanComponent
                    },
                    {   path:'DaftarPemesanan/:id', 
                        component:DaftarPemesanComponent
                    },
                    {   path:'DaftarPemesananPrivate/:id', 
                        component:DaftarPemesanPrivateComponent
                    },
                    {   path:'UbahProfilTravel', 
                        component:UbahProfilTravelComponent
                    },
                    {   path:'DaftarTrip', 
                        component:DaftarTripComponent},
                    {   path:'UbahTrip/:id', 
                        component:JualTripContent2Component
                    },
                    {   path:'SalinTrip/:id', 
                        component:SalinTripComponent
                    },
                    {   path:'PesanMasuk', 
                        component:PesanMasukProviderComponent
                    },
                    {   path:'DiskusiProvider', 
                        component:DiskusiProviderComponent
                    },
                ]
            },
            {   path:'EtalaseTravel/:id', 
                component:EtalaseTravelComponent,
            }

        ]
    }
]

export const JualTripRouting: ModuleWithProviders = RouterModule.forChild(JualTrip);