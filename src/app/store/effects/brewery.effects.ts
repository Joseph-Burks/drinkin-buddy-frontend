import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Router } from "@angular/router";


import { BreweryService } from '../../services/brewery.service';

import {
    loadBreweries,
    loadBreweriesFail,
    loadBreweriesSuccess,
    addBrewery,
    addBreweryFail,
    addBrewerySuccess,
    loadBrewery,
    loadBreweryFail,
    loadBrewerySuccess,
} from '../actions/brewery.actions';

 
@Injectable()
export class BreweryEffects {
 
    loadBreweries$ = createEffect(() => this.actions$.pipe(
        ofType(loadBreweries),
        mergeMap(() => this.breweryService.getAll()
            .pipe(
                map(breweries => loadBreweriesSuccess({breweries})),
                catchError(() => of(loadBreweriesFail()))
            )
        )
    ));

    addBrewery$ = createEffect(() => this.actions$.pipe(
        ofType(addBrewery),
        mergeMap((action) => this.breweryService.addNew(action)
            .pipe(
                map(brewery => {
                    this.router.navigate([`/brewery/${brewery.id}`])
                    return addBrewerySuccess(brewery)
                }),
                catchError(response => (of(addBreweryFail({ errorMessage: response.error.name })))
            )
        )
    )))

    loadBrewery$ = createEffect(() => {
        console.log('load brewery')
        return this.actions$.pipe(
        ofType(loadBrewery),
        mergeMap((action) => this.breweryService.getBrewery(action.id)
            .pipe(
                map(breweryDetails => {
                    return loadBrewerySuccess(breweryDetails)
                }),
                catchError(response => {
                    alert(response.error)
                    this.router.navigate(['/breweries'])
                    return of(loadBreweryFail({ errorMessage: response.error }))
                }
            )
        )
    ))})
 
    constructor(
        private actions$: Actions,
        private breweryService: BreweryService,
        private router: Router,
    ) {}
}