import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { BreweryService } from '../services/brewery.service';

 
@Injectable()
export class BreweryEffects {
 
  loadBreweries$ = createEffect(() => this.actions$.pipe(
    ofType('[Breweries Component] Load Breweries'),
    mergeMap(() => this.breweryService.getAllBreweries()
      .pipe(
        map(breweries => ({ type: '[Breweries API] Breweriesies Loaded Success', payload: breweries })),
        catchError(() => EMPTY)
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private breweryService: BreweryService
  ) {}
}