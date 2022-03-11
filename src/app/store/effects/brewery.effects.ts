import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { BreweryService } from '../../services/brewery.service';

import {
    loadBreweries,
    loadBreweriesFail,
    loadBreweriesSuccess
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
 
    constructor(
        private actions$: Actions,
        private breweryService: BreweryService
    ) {}
}