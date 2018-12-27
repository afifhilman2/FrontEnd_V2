import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { PesanMasukProviderRouterModule } from './pesan-masuk-provider-routing.module';
import { PesanMasukProviderComponent } from './pesan-masuk-provider.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PesanMasukProviderRouterModule

  ],
  declarations: [ 
    PesanMasukProviderComponent
   ],
 
})
export class PesanMasukProviderModule { }
