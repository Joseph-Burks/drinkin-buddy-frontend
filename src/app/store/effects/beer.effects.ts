import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { BeerService } from '../../services/beer.service';

import {
    loadBeers,
    loadBeersFail,
    loadBeersSuccess,
    loadBeer,
    loadBeerFail,
    loadBeerSuccess
} from '../actions/beer.actions';

 
@Injectable()
export class BeerEffects {
 
    loadBeers$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(loadBeers),
        mergeMap(() => this.beerService.getBeers()
            .pipe(
                map(beers => loadBeersSuccess({beers})),
                catchError(() => of(loadBeersFail()))
            )
        )
    )});

    loadBeer$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(loadBeer),
        mergeMap((action) => this.beerService.getBeer(action.id)
            .pipe(
                map(beerDetails => {
                    return loadBeerSuccess(beerDetails)
                }),
                catchError(response => {
                    console.log(response)
                    alert(response.error)
                    this._location.back()
                    return of(loadBeerFail({ errorMessage: response.error }))
                }
            )
        )
    ))})
 
    constructor(
        private actions$: Actions,
        private beerService: BeerService,
        private router: Router,
        private _location: Location
    ) {}
}