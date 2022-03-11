import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Beer } from '../../models/beer';

import { 
  beersLoading,
  beersLoaded,
  beers,
  
} from '../../store/app.store';
import { loadBeers, filterBeers } from '../../store/actions/beer.actions'


@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {
  beers$: Observable<Beer[]> = this._store.select(beers)
  beersLoading$: Observable<boolean> = this._store.select(beersLoading)

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this.getBeers()
  }

  getBeers(): void {
    this._store.dispatch(loadBeers())
  }

  filter(term: string): void {
    this._store.dispatch(filterBeers({filter: term.toLowerCase()}))
  }

}
