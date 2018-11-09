import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';

import { RegisterComponent } from './register.component';
import { RegisterRouterModule } from './register-routing.modules';
import { HeaderNologinComponent } from '../header-nologin/header-nologin.component';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider} from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("51339990419-9bcp4q7duankov4v0v57f1cg9kvvf1bg.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("261462964525976")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRouterModule,
    SocialLoginModule
  ],
  declarations: [ 
    RegisterComponent,
    HeaderNologinComponent,
   ],
   providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
})
export class RegisterModule { }
