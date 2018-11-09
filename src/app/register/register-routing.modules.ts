import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { HeaderNologinComponent } from '../header-nologin/header-nologin.component';

const routes: Routes = [
  
      {
        path:'', component:RegisterComponent,
      }
      
    ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRouterModule { }
