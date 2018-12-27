import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { ProsesPemesananRouterModule } from './proses-pemesanan-routing.module';
import { ProsesPemesananComponent } from './proses-pemesanan.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProsesPemesananRouterModule
  ],
  declarations: [ 
    ProsesPemesananComponent
   ],
 
})
export class ProsesPemesananModule { }
