import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { userInterests } from '../../store/app.store';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  userInterests$ = this._store.select(userInterests)

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
