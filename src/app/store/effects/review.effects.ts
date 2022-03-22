import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Location } from '@angular/common';


import { ReviewService } from '../../services/review.service';

import {
    addReview,
    addReviewFail,
    addReviewSuccess,
} from '../actions/review.actions';

 
@Injectable()
export class ReviewEffects {

    addReview$ = createEffect(() => this.actions$.pipe(
        ofType(addReview),
        mergeMap((action) => this.reviewService.addNew(action)
            .pipe(
                map(review => {
                    //this.router.navigate([`/brewery/${brewery.id}`])
                    return addReviewSuccess(review)
                }),
                catchError(response => {
                    console.log(response)
                    return of(addReviewFail({ errorMessage: response.error.user }))
                })
            )
    )))
 
    constructor(
        private actions$: Actions,
        private reviewService: ReviewService,
        private router: Router,
        private _location: Location
    ) {}
}