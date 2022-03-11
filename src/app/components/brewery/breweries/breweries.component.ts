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

import { loadBreweries, filterBreweries } from '../../../store/actions/brewery.actions'

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.css']
})
export class BreweriesComponent implements OnInit {

  breweries$: Observable<Brewery[]> = this._store.select(breweries)
  breweriesLoading$ : Observable<boolean> = this._store.select(breweriesLoading)
  breweriesLoaded$ : Observable<boolean> = this._store.select(breweriesLoaded)
  
  constructor( private router: Router, private _store: Store ) { }

  ngOnInit(): void {
    this.getAllBreweries()
  }

  getAllBreweries(): void {
    this._store.dispatch(loadBreweries())
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

}
