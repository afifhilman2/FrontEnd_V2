import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritUserComponent } from './favorit-user.component';


const routes: Routes = [
  {
    path: '',
    component: FavoritUserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritUserRouterModule { }
