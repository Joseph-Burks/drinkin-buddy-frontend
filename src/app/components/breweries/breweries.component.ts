import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Brewery } from '../../models/brewery';
import { selectBreweries } from '../../store/app.store';

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.css']
})
export class BreweriesComponent implements OnInit {

  breweries$: Observable<Brewery[]> = this._store.select(selectBreweries)

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this.getAllBreweries()
  }

  getAllBreweries(): void {
    
  }

  logBreweries(): void {
    console.log(this.breweries$)
  }

}
