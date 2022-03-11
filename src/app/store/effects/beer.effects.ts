import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { BeerService } from '../../services/beer.service';

import {
    loadBeers,
    loadBeersFail,
    loadBeersSuccess
} from '../actions/beer.actions';

 
@Injectable()
export class BeerEffects {
 
    loadBeers$ = createEffect(() => {
        console.log('beer effect')
        return this.actions$.pipe(
        ofType(loadBeers),
        mergeMap(() => this.beerService.getBeers()
            .pipe(
                map(beers => loadBeersSuccess({beers})),
                catchError(() => of(loadBeersFail()))
            )
        )
    )});
 
    constructor(
        private actions$: Actions,
        private beerService: BeerService
    ) {}
}