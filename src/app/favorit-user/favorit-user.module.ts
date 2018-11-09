import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';


import { FavoritUserRouterModule } from './favorit-user-routing.module';
import { FavoritUserComponent } from './favorit-user.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FavoritUserRouterModule
  ],
  declarations: [ 
    FavoritUserComponent
   ],
 
})
export class FavoritUserModule { }
