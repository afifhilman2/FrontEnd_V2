import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeaderUserComponent } from './header-user/header-user.component';
import { SidebarAkunProfilComponent } from './sidebar-akun-profil/sidebar-akun-profil.component';
import { EksternalComponent } from './eksternal/eksternal.component';
import { LupaKataSandiComponent } from './lupa-kata-sandi/lupa-kata-sandi.component';
import { UbahKataSandiComponent } from './ubah-kata-sandi/ubah-kata-sandi.component';
import { AuthService } from './token/auth.service';
import { DataService} from './data.service';
import { GuardService } from './guard.service';
import { routes, AppRoutingModule } from './app.route';
import { AppService } from './app.service';
import { CalendarComponent } from './calendar/calendar.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SearchFilterPipe } from './header/search-pipe';
import { ClickOutsideDirective } from './header/directive-dropdown';
import { MiniFooterComponent } from './mini-footer/mini-footer.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader-service';

import { TrvSearchNavbarModule } from './trv-search-navbar/trv-search-navbar.module';
import {JualTripModule} from './jual-trip/jual-trip.module';
import { PagerService } from './_service/index';
import { RegisterModule } from './register/register.module';

import { LandingpageModule } from './landingpage/landingpage.module';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { ActivatedAcountComponent } from './activated-acount/activated-acount.component';
import { SaldoModule } from './saldo/saldo.module';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    EksternalComponent,
    HeaderComponent,
    HeaderUserComponent,
    SidebarAkunProfilComponent,
    UbahKataSandiComponent,
    CalendarComponent,
    SearchFilterPipe,
    ClickOutsideDirective,
    MiniFooterComponent,
    LoaderComponent,
    ActivatedAcountComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TrvSearchNavbarModule,
    RegisterModule,
    LandingpageModule,
    SaldoModule,
    Ng4GeoautocompleteModule.forRoot(),
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBClUZWzmnXM-51wYSX22_lI2dBouzEDXM'
    }),
  
    
  ],
  providers: [AppService, DataService, AuthService, GuardService, DatePipe, LoaderService,{provide:LOCALE_ID,useValue:'id'}, PagerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
