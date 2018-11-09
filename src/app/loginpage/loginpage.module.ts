import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { LoginpageRouterModule } from './loginpage-routing.module';
import { LoginpageComponent } from './loginpage.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginpageRouterModule
  ],
  declarations: [ 
    LoginpageComponent
   ],
 
})
export class LoginpageModule { }
