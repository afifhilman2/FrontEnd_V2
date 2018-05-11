import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JualTripContentComponent } from './jual-trip-content/jual-trip-content.component';

const routes: Routes = [
  {
    path: 'JualTrip/JualTripContent',
    component: JualTripContentComponent
  },
  {
    path: 'JualTrip/JualTripContent2',
    loadChildren: './jual-trip-content2/jual-trip-content2.module#JualTripContent2Module'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
