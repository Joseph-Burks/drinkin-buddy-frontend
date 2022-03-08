import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { BeersComponent } from './components/beers/beers.component';
import { BeerDetailsComponent } from './components/beer-details/beer-details.component';
import { MessagesComponent } from './components/messages/messages.component';
import { BeerSearchComponent } from './components/beer-search/beer-search.component';

import { UserService } from './services/user.service';

import { appReducer, APP_FEATURE_NAME } from './store/app.store';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BreweriesComponent } from './components/breweries/breweries.component';
import { AddBreweryComponent } from './components/breweries/add-brewery/add-brewery.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    BeersComponent,
    BeerDetailsComponent,
    MessagesComponent,
    BeerSearchComponent,
    NavigationComponent,
    BreweriesComponent,
    AddBreweryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    StoreModule.forRoot({[APP_FEATURE_NAME]: appReducer}),
    //StoreModule.forFeature({BREWERY_FEATURE_NAME, breweryReducer})
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
