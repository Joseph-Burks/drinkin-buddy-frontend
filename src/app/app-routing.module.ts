import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReviewComponent } from './components/review/review/review.component';
import { BreweriesComponent } from './components/brewery/breweries/breweries.component';
import { AddBreweryComponent } from './components/brewery/add-brewery/add-brewery.component';
import { BreweryDetailsComponent } from './components/brewery/brewery-details/brewery-details.component';
import { BeersComponent } from './components/beer/beers/beers.component';
import { AddBeerComponent } from './components/beer/add-beer/add-beer.component';
import { BeerDetailsComponent } from './components/beer/beer-details/beer-details.component';
import { InterestsComponent } from './components/interests/interests.component'
import { MyReviewsComponent } from './components/review/my-reviews/my-reviews.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reviews', component: ReviewComponent},
  { path: 'breweries', component: BreweriesComponent },
  { path: 'new-brewery', component: AddBreweryComponent },
  { path: 'brewery/:id', component: BreweryDetailsComponent},
  { path: 'beers', component: BeersComponent },
  { path: 'new-beer', component: AddBeerComponent },
  { path: 'beer/:id', component: BeerDetailsComponent},
  { path: 'interests', component: InterestsComponent},
  { path: 'my-reviews', component: MyReviewsComponent},
  { path: '**', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
