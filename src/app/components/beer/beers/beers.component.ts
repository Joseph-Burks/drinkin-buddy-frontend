import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'

import { Beer } from '../../../models/beer';

import { 
  beersLoading,
  beersLoaded,
  beers,
  
} from '../../../store/app.store';
import { loadBeers, loadTwentyBeers, filterBeers } from '../../../store/actions/beer.actions'


@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {
  beers$: Observable<Beer[]> = this._store.select(beers)
  beersLoading$: Observable<boolean> = this._store.select(beersLoading)
  startIndex: number = 0

  constructor( private router: Router, private _store: Store) { }

  ngOnInit(): void {
    this.getBeers()
  }

  getBeers(): void {
    this._store.dispatch(loadTwentyBeers())
    this._store.dispatch(loadBeers())
  }

  beersLength(): number {
    let length = 0
    this.beers$.subscribe(beers => length = beers.length)
    return length
  }

  next(): void {
    this.startIndex += 20
  }

  last(): void {
    let length = 0
    this.beers$.subscribe(beers => length = beers.length)
    let remainder = length % 20
    this.startIndex = length - remainder - 1
  }

  previous(): void {
    this.startIndex -= 20
  }

  first(): void {
    this.startIndex = 0
  }

  filter(term: string): void {
    this._store.dispatch(filterBeers({filter: term.toLowerCase()}))
  }

  goToAddBeer(): void {
    this.router.navigate(['/new-brewery'])
  }

  sortList(): void {
    console.log('sort clicked')
  }

  filterList(): void {
    console.log('filter clicked')
  }

  goToBeer(id: number): void {
    this.router.navigate([`beer/${id}`])
  }

}
