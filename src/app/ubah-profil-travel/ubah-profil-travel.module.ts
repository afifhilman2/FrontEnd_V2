import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';


import { UbahProfilTravelRouterModule } from './ubah-profil-travel-routing.module';
import { UbahProfilTravelComponent } from './ubah-profil-travel.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UbahProfilTravelRouterModule
  ],
  declarations: [ 
    UbahProfilTravelComponent
   ],
 
})
export class UbahProfilTravelModule { }
