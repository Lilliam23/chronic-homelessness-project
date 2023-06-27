import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NavigationModule } from './navigation/navigation.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { DataService } from './data.service';
import { UtilitiesService } from './utilities.service';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { GoogleMapsModule } from '@angular/google-maps';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavigationModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    GeoapifyGeocoderAutocompleteModule.withConfig('API_KEY'),
    AuthModule.forRoot({
      domain: 'feritech.us.auth0.com',
      clientId: 'p0EuGWg2ZPJisLSNOC5bfj5ioJEwXWEe',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [
    DataService,
    UtilitiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
