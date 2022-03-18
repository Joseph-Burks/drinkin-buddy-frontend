import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog'

import { BreweryDetails } from '../../../models/brewery';
import { Beer } from '../../../models/beer';
import { AddBeerComponent } from '../../beer/add-beer/add-beer.component';
import {
  errorMessage,
  breweryLoading,
  breweryLoaded,
  breweryName,
  breweryAddress,
  breweryLongitude,
  breweryLatitude,
  breweryPhone,
  breweryURL,
  breweryBeers,
  brewery
} from '../../../store/app.store';

import { loadBrewery } from '../../../store/actions/brewery.actions'

@Component({
  selector: 'app-brewery-details',
  templateUrl: './brewery-details.component.html',
  styleUrls: ['./brewery-details.component.css']
})
export class BreweryDetailsComponent implements OnInit {
  errorMessage$: Observable<string> = this._store.select(errorMessage)
  brewery$: Observable<BreweryDetails | null> = this._store.select(brewery)
  breweryLoading$: Observable<boolean> = this._store.select(breweryLoading)
  breweryLoaded$: Observable<boolean> = this._store.select(breweryLoaded)
  breweryName$: Observable<string | null> = this._store.select(breweryName)
  breweryAddress$: Observable<string | null> = this._store.select(breweryAddress)
  breweryLongitude$: Observable<string | null> = this._store.select(breweryLongitude)
  breweryLatitude$: Observable<string | null> = this._store.select(breweryLatitude)
  breweryPhone$: Observable<string | null> = this._store.select(breweryPhone)
  breweryURL$: Observable<string | null> = this._store.select(breweryURL)
  breweryBeers$: Observable<Beer[] | null> = this._store.select(breweryBeers)


  constructor(
    private route: ActivatedRoute,
    private _store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getBrewery()
  }

  getBrewery(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this._store.dispatch(loadBrewery({id}))
  }

  toggleAddBeer(): void {
    const dialogRef = this.breweryName$.subscribe(breweryName => this.dialog.open(AddBeerComponent, {
      height: '50%',
      width: '50%',
      data: {
        breweryId: Number(this.route.snapshot.paramMap.get('id')),
        breweryName
      }
    }))
  }

}
