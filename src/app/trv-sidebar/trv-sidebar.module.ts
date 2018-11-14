import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';


import { TrvSidebarRoterModule } from './trv-sidebar-routing.module';
import { TrvSidebarComponent } from './trv-sidebar.component';
import { FooterComponent } from '../footer/footer.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrvSidebarRoterModule,
  ],
  declarations: [ 
    TrvSidebarComponent,
    FooterComponent,
   ],
 
})
export class TrvSidebarModule { }
