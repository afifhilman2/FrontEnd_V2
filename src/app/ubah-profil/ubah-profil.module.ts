import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';


import { UbahProfilComponent } from './ubah-profil.component';
import { UbahProfilRouterModule } from './ubah-profil-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UbahProfilRouterModule
  ],
  declarations: [ 
    UbahProfilComponent
   ],
 
})
export class UbahProfilModule { }
