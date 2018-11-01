import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';



import { RegisterComponent } from './register.component';
import { RegisterRouterModule } from './register-routing.modules';
import { HeaderNologinComponent } from '../header-nologin/header-nologin.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRouterModule,
  ],
  declarations: [ 
    RegisterComponent,
    HeaderNologinComponent,
   ],
 
})
export class RegisterModule { }
