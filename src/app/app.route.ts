import { Routes, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from './token/auth-guard.service';
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
import { FavoritUserComponent } from "./favorit-user/favorit-user.component";
import { TrvSidebarComponent } from "./trv-sidebar/trv-sidebar.component";
import { TrvSearchResultComponent } from "./trv-search-result/trv-search-result.component";
import { TrvSearchNavbarComponent} from "./trv-search-navbar/trv-search-navbar.component";
import { EtalaseTravelComponent} from "./etalase-travel/etalase-travel.component";
import { DaftarTravelComponent} from "./daftar-travel/daftar-travel.component";
import { JualTripComponent} from "./jual-trip/jual-trip.component";
import { JualTripContentComponent} from "./jual-trip-content/jual-trip-content.component";
import { JualTripContent2Component} from "./jual-trip-content2/jual-trip-content2.component";
import { SaldoComponent} from "./saldo/saldo.component";
import { DaftarTripComponent} from "./daftar-trip/daftar-trip.component";
import { UbahProfilTravelComponent} from "./ubah-profil-travel/ubah-profil-travel.component";
import { TransaksiPenjualanComponent} from "./transaksi-penjualan/transaksi-penjualan.component";
import { DaftarPemesanComponent} from "./daftar-pemesan/daftar-pemesan.component";
import { DetailPaketComponent } from './detail-paket/detail-paket.component';
import { UbahProfilComponent } from './ubah-profil/ubah-profil.component';
import { ProsesPemesananComponent } from './proses-pemesanan/proses-pemesanan.component';
import { ProsesBayarComponent } from './proses-bayar/proses-bayar.component';
import { ProsesBayar2Component } from './proses-bayar2/proses-bayar2.component';
import { RegisterComponent } from './register/register.component';
import { CalendarComponent } from './calendar/calendar.component';


export const routes :Routes = [

    // without login header
    {
        path :'', 
        component:HeaderComponent,
        children: [
            {path:'', component:LandingpageComponent},
            {path:'search/:id', component:TrvSearchResultComponent},
            {path:'searchNavbar/:query', component:TrvSearchNavbarComponent},
            {path:'loginpage', component:LoginpageComponent},
            {path:'Notifikasi', component:EksternalComponent},
            {path:'JadiTravel', component:DaftarTravelComponent,},
            {path:'EtalaseTravel', component:EtalaseTravelComponent},
            {path:'DetailPaket', component:DetailPaketComponent},
            {path:'ProsesPemesanan', component:ProsesPemesananComponent},
            {path:'ProsesBayar', component:ProsesBayarComponent},
            {path:'ProsesBayar2', component:ProsesBayar2Component},
            {path:'Daftar', component:RegisterComponent},
            {path:'Calendar', component:CalendarComponent},
            {path:'Akun', component:TrvSidebarComponent,
            children:[
                {path:'', component:PemesananComponent},
                {path:'Profile', component:UbahProfilComponent},
                {path:'Pemesanan', component:PemesananComponent},
                {path:'Favorit', component:FavoritUserComponent},
                {path:'Notifikasi', component:EksternalComponent},
                {path:'Promo', component:EksternalComponent}
                    ]
                    },
            {path:'JualTrip', component:JualTripComponent,
            children:[
                {path:'', component:JualTripContentComponent},
                {path:'Saldo', component:SaldoComponent},
                {path:'JualTrip', component:JualTripContentComponent},
                {path:'TransaksiPenjualan', component:TransaksiPenjualanComponent},
                {path:'UbahProfilTravel', component:UbahProfilTravelComponent},
                {path:'DaftarTrip', component:DaftarTripComponent},
            ]
            }
                    ]
    },


    //with login
    // {
    //     path :'traveler', 
    //     component:HeaderUserComponent,
    //     children: [
    //         {path:'', component:LandingpageComponent},
    //         {path:'search', component:TrvSearchResultComponent},
    //         {path:'searchNavbar/:query', component:TrvSearchNavbarComponent},
    //         {path:'loginpage', component:LoginpageComponent},
    //         {path:'Notifikasi', component:EksternalComponent},
    //         {path:'JadiTravel', component:DaftarTravelComponent,},
    //         {path:'EtalaseTravel', component:EtalaseTravelComponent},
    //         {path:'DetailPaket', component:DetailPaketComponent},
    //         {path:'ProsesPemesanan', component:ProsesPemesananComponent},
    //         {path:'ProsesBayar', component:ProsesBayarComponent},
    //         {path:'ProsesBayar2', component:ProsesBayar2Component},
    //         {path:'Calendar', component:CalendarComponent},
    //         {path:'Akun', component:TrvSidebarComponent,
    //         children:[
    //             {path:'', component:PemesananComponent},
    //             {path:'Profil', component:UbahProfilComponent},
    //             {path:'Pemesanan', component:PemesananComponent},
    //             {path:'Favorit', component:FavoritUserComponent},
    //             {path:'Notifikasi', component:EksternalComponent},
    //             {path:'Promo', component:EksternalComponent}
    //                 ]
    //                 },
    //         {path:'JualTrip', component:JualTripComponent,
    //         children:[
    //             {path:'', component:JualTripContentComponent},
    //             {path:'Saldo', component:SaldoComponent},
    //             {path:'JualTrip', component:JualTripContentComponent},
    //             {path:'TransaksiPenjualan', component:TransaksiPenjualanComponent},
    //             {path:'UbahProfilTravel', component:UbahProfilTravelComponent},
    //             {path:'DaftarTrip', component:DaftarTripComponent},
    //         ]
    //         }
    //                 ]
    // },
    
    //lupa sandi
    {
        path:'login', component:LupaKataSandiComponent,
    },

    //Daftar

    {path:'Daftar', component:RegisterComponent},

    //not found
    {
        path:'**', component:EksternalComponent
    }



] 
