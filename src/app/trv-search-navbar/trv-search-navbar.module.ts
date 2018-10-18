import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import {TrvSearchNavbarComponent} from './trv-search-navbar.component';
import {TrvSearchNavbarRouting } from './trv-search-navbar.routing';


@NgModule ({

    imports:[
        TrvSearchNavbarRouting,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],

    declarations:[TrvSearchNavbarComponent]

})

export class TrvSearchNavbarModule {} 