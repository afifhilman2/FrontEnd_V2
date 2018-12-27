import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { IsiDataPesertaRouterModule } from './isi-data-peserta-routing.module';
import { IsiDataPesertaComponent } from './isi-data-peserta.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IsiDataPesertaRouterModule
  ],
  declarations: [ 
    IsiDataPesertaComponent
   ],
 
})
export class IsiDataPesertaModule { }
