import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';


import { ResetPasswordRouterModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ResetPasswordRouterModule, 
    
  ],
  declarations: [
    ResetPasswordComponent,
   ],
 
})
export class ResetPasswordModule { }
