import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Brewery } from '../../models/brewery';
import { selectAllBreweries, selectFirstBrewery } from '../../store/brewery.store';

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.css']
})
export class BreweriesComponent implements OnInit {

  breweries$: Observable<Brewery[]> = this._store.select(selectAllBreweries)
  firstBrewery$ = this._store.select(selectFirstBrewery)

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this.getAllBreweries()
  }

  getAllBreweries(): void {
    
  }

  logBreweries(): void {
    console.log(this.firstBrewery$)
  }

}
