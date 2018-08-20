import {NgModule} from '@angular/core';

import {JualTripComponent} from '../jual-trip/jual-trip.component';
import {JualTripRouting } from '../jual-trip/jual-trip.routing';


@NgModule ({

    imports:[JualTripRouting],

    declarations:[JualTripComponent]

})

export class JualTripModule {} 