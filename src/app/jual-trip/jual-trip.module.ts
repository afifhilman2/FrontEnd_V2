import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyDatePickerModule } from 'mydatepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { JualTripComponent} from '../jual-trip/jual-trip.component';

import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { AgmCoreModule } from '@agm/core';
import { HeaderProviderComponent } from ".././header-provider/header-provider.component";
import { JualTripRouterModule } from './jual-trip.routing';

@NgModule ({

    imports:[
        // JualTripRouting,
        CommonModule,
        JualTripRouterModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MyDatePickerModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBClUZWzmnXM-51wYSX22_lI2dBouzEDXM'
          }),
        Ng4GeoautocompleteModule.forRoot(),
    ],

    declarations:[
        JualTripComponent,
        HeaderProviderComponent
        // MiniFooterComponent,
    ]

})

export class JualTripModule {} 