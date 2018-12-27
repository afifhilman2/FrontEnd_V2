import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import {HeaderProviderComponent } from '.././header-provider/header-provider.component';
import { JualTripComponent } from ".././jual-trip/jual-trip.component";
import { MiniFooterComponent } from '../mini-footer/mini-footer.component';


const JualTrip: Routes = [

            {
                path:'',
                component:JualTripComponent,
                children:[
                   
                    {   path:'Saldo', 
                        loadChildren:'../saldo/saldo.module#SaldoModule',
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
            // {   path:'EtalaseTravel/:id', 
            //     loadChildren:'../etalase-travel/etalase-travel.module#EtalaseTravelModule',
            // },
]


@NgModule({
    imports: [RouterModule.forChild(JualTrip)],
    exports: [RouterModule]
  })
  export class JualTripRouterModule { }