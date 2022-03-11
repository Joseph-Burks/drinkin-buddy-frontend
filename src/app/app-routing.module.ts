import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BreweriesComponent } from './components/breweries/breweries.component';
import { AddBreweryComponent } from './components/breweries/add-brewery/add-brewery.component';
import { BeersComponent } from './components/beers/beers.component';
import { BeerDetailsComponent } from './components/beer-details/beer-details.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { 
    path: 'breweries',
    component: BreweriesComponent,
    children: [
      { path: 'new-brewery', component: AddBreweryComponent},
    ]
  },
  { path: 'beers', component: BeersComponent },
  { path: 'detail/:id', component: BeerDetailsComponent},
  { path: '**', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
