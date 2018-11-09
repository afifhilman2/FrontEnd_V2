import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { TrvSearchResultComponent } from './trv-search-result.component';


const routes: Routes = [
  {
    path: '',
    component: TrvSearchResultComponent
    ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrvSearchResultRouterModule { }
