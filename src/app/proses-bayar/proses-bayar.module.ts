import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { ProsesBayarRouterModule } from './proses-bayar-routing.module';
import { ProsesBayarComponent } from './proses-bayar.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProsesBayarRouterModule
  ],
  declarations: [ 
    ProsesBayarComponent
   ],
 
})
export class ProsesBayarModule { }
