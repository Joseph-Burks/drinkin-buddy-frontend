import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Brewery } from '../../../models/brewery';
import { 
  breweriesLoading,
  breweriesLoaded,
  breweries
} from '../../../store/app.store';

import { loadTwentyBreweries, loadBreweries, filterBreweries } from '../../../store/actions/brewery.actions'

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.css']
})
export class BreweriesComponent implements OnInit {

  breweries$: Observable<Brewery[]> = this._store.select(breweries)
  breweriesLoading$: Observable<boolean> = this._store.select(breweriesLoading)
  breweriesLoaded$: Observable<boolean> = this._store.select(breweriesLoaded)
  startIndex: number = 0
  
  constructor( private router: Router, private _store: Store ) { }

  ngOnInit(): void {
    this.getBreweries()
    this._store.dispatch(filterBreweries({filter: ''}))
  }

  getBreweries(): void {
    this._store.dispatch(loadTwentyBreweries())
    this._store.dispatch(loadBreweries())
  }

  breweriesLength(): number {
    let length = 0
    this.breweries$.subscribe(breweries => length = breweries.length)
    return length
  }

  next(): void {
    this.startIndex += 20
  }

  last(): void {
    let length = 0
    this.breweries$.subscribe(breweries => length = breweries.length)
    let remainder = length % 20
    this.startIndex = length - remainder - 1
  }

  previous(): void {
    this.startIndex -= 20
  }

  first(): void {
    this.startIndex = 0
  }

  logBrewery(brewery: Brewery): void {
    console.log(brewery)
  }

  filter(term: string): void {
    this._store.dispatch(filterBreweries({filter: term.toLowerCase()}))
  }

  goToAddBrewery(): void {
    this.router.navigate(['/new-brewery'])
  }

  sortList(): void {
    console.log('sort clicked')
  }

  filterList(): void {
    console.log('filter clicked')
  }

  goToBrewery(id: number): void {
    
    this.router.navigate([`/brewery/${id}`])
  }


}
