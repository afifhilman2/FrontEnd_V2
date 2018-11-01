import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';



// import { RegisterComponent } from './register.component';
// import { RegisterRouterModule } from './register-routing.modules';

// import { HeaderNologinComponent } from '../header-nologin/header-nologin.component';
import { DetailPaketRouterModule } from './detail-paket-routing.module';
import { DetailPaketComponent } from './detail-paket.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DetailPaketRouterModule
  ],
  declarations: [ 
    // RegisterComponent,
    DetailPaketComponent,
    // HeaderNologinComponent,
   ],
 
})
export class DetailPaketModule { }
