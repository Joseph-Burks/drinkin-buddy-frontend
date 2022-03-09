import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Brewery } from '../../models/brewery';
import { 
  loadBreweries,
  breweriesLoading,
  breweriesLoaded,
  breweries
} from '../../store/app.store';

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.css']
})
export class BreweriesComponent implements OnInit {

  breweries$: Observable<Brewery[]> = this._store.select(breweries)
  breweriesLoading$ : Observable<boolean> = this._store.select(breweriesLoading)
  breweriesLoaded$ : Observable<boolean> = this._store.select(breweriesLoaded)
  
  constructor(private _store: Store) { }

  ngOnInit(): void {
    this.getAllBreweries()
  }

  getAllBreweries(): void {
    this._store.dispatch(loadBreweries())
  }

  logBrewery(brewery: Brewery): void {
    console.log(brewery)
  }

}
