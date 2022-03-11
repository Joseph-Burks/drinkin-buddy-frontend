import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { logOutUser } from '../../store/actions/user.actions';
import { userLoaded } from '../../store/app.store';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  userLoaded$ = this._store.select(userLoaded)

  constructor(
    private router: Router,
    private _store: Store
  ) { }

  ngOnInit(): void {
  }

  navigate(route: string): void {
    this.router.navigate([route])
  }

  logOut(): void {
    this._store.dispatch(logOutUser())
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

}
