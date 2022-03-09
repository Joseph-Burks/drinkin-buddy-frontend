import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { BreweryService } from '../services/brewery.service';

import {
    loadBreweriesFail,
    loadBreweriesSuccess
} from '../store/app.store';

 
@Injectable()
export class BreweryEffects {
 
    loadBreweries$ = createEffect(() => this.actions$.pipe(
        ofType('[Breweries Component] Load Breweries'),
        mergeMap(() => this.breweryService.getAll()
            .pipe(
                map(breweries => loadBreweriesSuccess({breweries})),
                catchError(() => EMPTY)
            )
        )
    ));
 
    constructor(
        private actions$: Actions,
        private breweryService: BreweryService
    ) {}
}