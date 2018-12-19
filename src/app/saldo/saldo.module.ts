import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';



import { MyDatePickerModule } from 'mydatepicker';

import { SaldoRouterModule } from './saldo-routing.module';
import { SaldoComponent } from './saldo.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SaldoRouterModule,
    MyDatePickerModule, 
    
  ],
  declarations: [
    SaldoComponent,
   ],
 
})
export class SaldoModule { }
