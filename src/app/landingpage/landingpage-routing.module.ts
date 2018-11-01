import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LandingpageComponent } from './landingpage.component';



const routes: Routes = [
  {
    
    path:'', component:LandingpageComponent, pathMatch: 'prefix' 
     
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRouterModule { }
