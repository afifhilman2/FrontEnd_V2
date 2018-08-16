import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrvSearchNavbarComponent} from "./trv-search-navbar.component";


const TrvSearchNavbar: Routes = [
    {
        path: 'searchNavbar/:query', 
        component: TrvSearchNavbarComponent,
    }
]

export const TrvSearchNavbarRouting: ModuleWithProviders = RouterModule.forChild(TrvSearchNavbar);