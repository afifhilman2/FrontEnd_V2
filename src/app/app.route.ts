import { NgModule} from '@angular/core'
import { Routes, CanActivate, RouterModule } from '@angular/router';
import { GuardService } from './guard.service';
import { HeaderComponent } from './header/header.component';
import { EksternalComponent } from './eksternal/eksternal.component';
import { HeaderNologinComponent } from './header-nologin/header-nologin.component';
import { LoaderComponent } from './loader/loader.component';
import { ActivatedAcountComponent } from './activated-acount/activated-acount.component';


export const routes :Routes = [

    {
        path :'', 
        component:HeaderComponent,
        children: [
            {path:'search', loadChildren:'./trv-search-result/trv-search-result.module#TrvSearchResultModule'},
            {path:'searchNavbar/', loadChildren: './trv-search-navbar/trv-search-navbar.module#TrvSearchNavbarModule'},
            {path:'Notifikasi', loadChildren:'./eksternal/eksternal.module#EksternalModule'},
            {path:'JadiTravel', loadChildren:'./daftar-travel/daftar-travel.module#DaftarTravelModule',},
            {path: 'DetailPaket/:id', loadChildren: './detail-paket/detail-paket.module#DetailPaketModule'},
            {path:'Akun', loadChildren:'./trv-sidebar/trv-sidebar.module#TrvSidebarModule'},
            {path:'Provider', loadChildren: './jual-trip/jual-trip.module#JualTripModule'},
        ]
    },
    
    {path:'aktivasi/:id', component: ActivatedAcountComponent},
    {path:'', component:HeaderNologinComponent,
        children:[
            {   path:'LoginPage', loadChildren:'./loginpage/loginpage.module#LoginpageModule'},
            {   path:'LupaPassword', loadChildren:'./lupa-kata-sandi/lupa-kata-sandi.module#LupaKataSandiModule'},
            {   path:'Daftar', loadChildren: 'app/register/register.module#RegisterModule'},
            {   path:'ProsesPemesanan', loadChildren:'./proses-pemesanan/proses-pemesanan.module#ProsesPemesananModule', canActivate:[GuardService]},
            {   path:'ProsesBayar2', loadChildren:'./proses-bayar2/proses-bayar2.module#ProsesBayar2Module'},
            {   path:'ProsesBayar', loadChildren:'./proses-bayar/proses-bayar.module#ProsesBayarModule'},
        ]
    },

    {
        path:'loader', component:LoaderComponent
    },
    

    //not found
    {
        path:'**', component:EksternalComponent
    }

] 

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

