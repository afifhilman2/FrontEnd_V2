import {NgModule} from '@angular/core';

import {TrvSearchNavbarComponent} from './trv-search-navbar.component';
import {TrvSearchNavbarRouting } from './trv-search-navbar.routing';


@NgModule ({

    imports:[TrvSearchNavbarRouting],

    declarations:[TrvSearchNavbarComponent]

})

export class TrvSearchNavbarModule {} 