import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { logOutUser, selectUserId } from 'src/app/store/app.store';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  userId$ = this._store.select(selectUserId)

  constructor(
    private router: Router,
    private _store: Store
  ) { }

  ngOnInit(): void {
    console.log(this.userId$)
  }

  goToBreweries(): void {
    this.router.navigate(['/breweries'])
  }

  logOut(): void {
    this._store.dispatch(logOutUser())
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

}
