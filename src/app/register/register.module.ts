import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';



import { RegisterComponent } from './register.component';
import { RegisterRouterModule } from './register-routing.modules'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRouterModule
  ],
  declarations: [ RegisterComponent ],
 
})
export class RegisterModule { }
