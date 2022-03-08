import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../models/user'
import { selectUsername } from '../../store/app.store';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  username$ = this._store.select(selectUsername)

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
  }

}
