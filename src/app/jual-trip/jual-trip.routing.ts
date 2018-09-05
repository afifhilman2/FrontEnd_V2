import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from ".././header/header.component";
import { HeaderUserComponent } from '.././header-user/header-user.component';
import { JualTripComponent } from ".././jual-trip/jual-trip.component";
import { JualTripContentComponent } from ".././jual-trip-content/jual-trip-content.component";
import { SaldoComponent } from ".././saldo/saldo.component";
import { TransaksiPenjualanComponent } from ".././transaksi-penjualan/transaksi-penjualan.component";
import { UbahProfilTravelComponent } from ".././ubah-profil-travel/ubah-profil-travel.component";
import { DaftarTripComponent } from ".././daftar-trip/daftar-trip.component";
import { JualTripContent2Component } from ".././jual-trip-content2/jual-trip-content2.component";
import { EtalaseTravelComponent } from ".././etalase-travel/etalase-travel.component";

const JualTrip: Routes = [
    {
        path: '', 
        component: HeaderComponent,
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
                    {   path:'UbahProfilTravel', 
                        component:UbahProfilTravelComponent
                    },
                    {   path:'DaftarTrip', 
                        component:DaftarTripComponent},
                    {   path:'UbahTrip/:id', 
                        component:JualTripContent2Component
                    },
                ]
            },
            {   path:'EtalaseTravel', 
                component:EtalaseTravelComponent,
            }

        ]
    }
]

export const JualTripRouting: ModuleWithProviders = RouterModule.forChild(JualTrip);