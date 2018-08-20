import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from ".././header/header.component";
import { JualTripComponent } from ".././jual-trip/jual-trip.component";
import { JualTripContentComponent } from ".././jual-trip-content/jual-trip-content.component";

const JualTrip: Routes = [
    {
        path: '', 
        component: HeaderComponent,
        children :[
            {
                path:'JualTrip',
                component:JualTripComponent,
                children:[
                    {
                        path:'',
                        component:JualTripContentComponent,
                    }
                ]
            }

        ]
    }
]

export const JualTripRouting: ModuleWithProviders = RouterModule.forChild(JualTrip);