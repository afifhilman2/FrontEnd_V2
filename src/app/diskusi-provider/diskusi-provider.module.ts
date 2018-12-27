import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { DiskusiProvideRouterModule } from './diskusi-provider-routing.module';
import { DiskusiProviderComponent } from './diskusi-provider.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DiskusiProvideRouterModule
  ],
  declarations: [ 
    DiskusiProviderComponent
   ],
 
})
export class DiskusiProviderModule { }
