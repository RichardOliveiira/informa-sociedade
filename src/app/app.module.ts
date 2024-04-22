import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { JwtModule } from '@auth0/angular-jwt';

export function jwtOptionsFactory() {
  return localStorage.getItem("access_token");
	};


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 

    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtOptionsFactory,
        allowedDomains: ["https://localhost:3030"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      }})
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
  bootstrap: [AppComponent],
})
export class AppModule {}
