import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { loadBeer } from '../../../store/actions/beer.actions'

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this.getBeer()
  }

  getBeer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this._store.dispatch(loadBeer({id}))
  }

}
