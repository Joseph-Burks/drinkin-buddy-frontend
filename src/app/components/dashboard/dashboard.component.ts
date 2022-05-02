import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../models/user'
import { UserReview } from './../../models/review';
import { username, userReviews, userInterests } from '../../store/app.store';
import { loadBeers } from '../../store/actions/beer.actions'
import { getLocaleNumberSymbol } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  username$ = this._store.select(username)
  userReviews$ = this._store.select(userReviews)
  userInterests$ = this._store.select(userInterests)

  constructor(
    private _store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBeers()
  }

  getBeers(): void {
    this._store.dispatch(loadBeers())
  }

  goToBeer(id: number): void {
    this.router.navigate([`beer/${id}`])
  }

  goToInterests(): void {
    this.router.navigate(['/interests'])
  }

  goToReviews(): void {
    this.router.navigate(['/my-reviews'])
  }

}
