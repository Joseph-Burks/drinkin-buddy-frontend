import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { userReviews } from '../../../store/app.store';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit {
  userReviews$ = this._store.select(userReviews)

  constructor(
    private _store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToBeer(id: number): void {
    this.router.navigate([`beer/${id}`])
  }

}
