import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../models/user'
import {
  selectUserId,
  selectUsername,
  selectUserIsMaker,
  selectMakerName,
  selectMakerAddress
} from '../../store/user.store';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  userId$ = this._store.select(selectUserId)
  username$ = this._store.select(selectUsername)
  isMaker$ = this._store.select(selectUserIsMaker)
  name$ = this._store.select(selectMakerName)
  address$ = this._store.select(selectMakerAddress)

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
  }

}
