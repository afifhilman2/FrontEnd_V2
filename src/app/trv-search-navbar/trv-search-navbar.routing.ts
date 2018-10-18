
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrvSearchNavbarComponent} from "./trv-search-navbar.component";
import { HeaderComponent } from ".././header/header.component";
import { LandingpageComponent } from ".././landingpage/landingpage.component";



const TrvSearchNavbar: Routes = [
    {
        path: '', 
        component: HeaderComponent,
        children :[
            {
                path:'',
                component:LandingpageComponent,
            },
            
            {
                path:'searchNavbar/',
                component:TrvSearchNavbarComponent,
            }

        ]
    }
]

export const TrvSearchNavbarRouting: ModuleWithProviders = RouterModule.forChild(TrvSearchNavbar);