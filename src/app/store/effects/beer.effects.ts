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
    addBeer,
    addBeerFail,
    addBeerSuccess,
    loadBeer,
    loadBeerFail,
    loadBeerSuccess,
    addBeerToInterests,
    addInterestSuccess,
    addInterestFail,
    deleteInterest,
    deleteInterestSuccess,
    deleteInterestFail,
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

    addBrewery$ = createEffect(() => this.actions$.pipe(
        ofType(addBeer),
        mergeMap((action) => this.beerService.addBeer(action)
            .pipe(
                map(beer => {
                    this.router.navigate([`/beer/${beer.id}`])
                    return addBeerSuccess(beer)
                }),
                catchError(response => {
                    console.log(response)
                    return of(addBeerFail({ errorMessage: response.error.name }))
                }
            )
        )
    )))

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

    addBeerToInterests$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(addBeerToInterests),
        mergeMap((action) => this.beerService.addInterest(action.beerId)
            .pipe(
                map(user => {
                    alert('Interst added successfully.')
                    console.log(user)
                    return addInterestSuccess(user)
                }),
                catchError(response => {
                    console.log(response)
                    alert(response.error)
                    return of(addInterestFail())
                }
            )
        )
    ))})

    deleteInterest$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(deleteInterest),
        mergeMap((action) => this.beerService.deleteInterest(action.beerId)
            .pipe(
                map(user => {
                    alert('Interst removed successfully.')
                    console.log(user)
                    return deleteInterestSuccess(user)
                }),
                catchError(response => {
                    console.log(response)
                    alert(response.error)
                    return of(deleteInterestFail())
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