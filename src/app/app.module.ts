import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BeersComponent } from './components/beer/beers/beers.component';
import { BeerDetailsComponent } from './components/beer/beer-details/beer-details.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BreweriesComponent } from './components/brewery/breweries/breweries.component';
import { AddBreweryComponent } from './components/brewery/add-brewery/add-brewery.component';
import { BreweryDetailsComponent } from './components/brewery/brewery-details/brewery-details.component';

import { UserService } from './services/user.service';
import { appReducer, APP_FEATURE_NAME } from './store/app.store';
import { UserEffects } from './store/effects/user.effects';
import { BreweryEffects } from './store/effects/brewery.effects';
import { BeerEffects } from './store/effects/beer.effects';
import { ReviewEffects } from './store/effects/review.effects';
import { AddBeerComponent } from './components/beer/add-beer/add-beer.component';
import { AddReviewComponent } from './components/review/add-review/add-review.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LandingComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    BeersComponent,
    BeerDetailsComponent,
    BreweriesComponent,
    AddBreweryComponent,
    BreweryDetailsComponent,
    AddBeerComponent,
    AddReviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    StoreModule.forRoot({[APP_FEATURE_NAME]: appReducer}),
    EffectsModule.forRoot([UserEffects, BreweryEffects, BeerEffects, ReviewEffects]),

    MatCardModule,
    MatButtonModule,
    MatSliderModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
