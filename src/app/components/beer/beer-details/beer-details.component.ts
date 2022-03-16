import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { BeerDetails } from '../../../models/beer';

import { loadBeer } from '../../../store/actions/beer.actions'
import {
  beer,
  beerLoading,
  beerLoaded,
  beerName,
  beerBreweryName,
  beerStyleName,
  beerABV,
  beerIBU,
  beerAverageRating
} from '../../../store/app.store'

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {
  beer$: Observable<BeerDetails | null> = this._store.select(beer)
  beerLoading$: Observable<boolean> = this._store.select(beerLoading)
  beerLoaded$: Observable<boolean> = this._store.select(beerLoaded)
  beerName$: Observable<string | null> = this._store.select(beerName)
  beerBreweryName$: Observable<string | null> = this._store.select(beerBreweryName)
  beerStyleName$: Observable<string | null> = this._store.select(beerStyleName)
  beerABV$: Observable<number | null> = this._store.select(beerABV)
  beerIBU$: Observable<number | null> = this._store.select(beerIBU)
  beerAverageRating$: Observable<number | null> = this._store.select(beerAverageRating)

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
