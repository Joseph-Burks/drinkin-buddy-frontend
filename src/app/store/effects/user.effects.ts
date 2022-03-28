import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from "@angular/router";

import { UserService } from '../../services/user.service';
import { SuccessfulUserResponse } from '../../models/successfulUserResponse';

import {
    loadUserWithToken,
    logInUser,
    signUpUser,
    signUpUserFail,
    userLoadedSuccess,
    userLoadedFail
} from '../actions/user.actions';

 
@Injectable()
export class UserEffects {
    
    signUpUser$ = createEffect(() => this.actions$.pipe(
        ofType(signUpUser),
        mergeMap((action) => this.userService.signUp({user: {username: action.usernameInput, password: action.passwordInput}})
            .pipe(
                map(response => this.succesfullLogIn(response)),
                catchError(response => {
                    
                    let errorMessage = `Username ${response.error.username[0]}`
                    alert(errorMessage)
                    return of(signUpUserFail({errorMessage}))
                })
            )
        )
    ));

    logInUser$ = createEffect(() => this.actions$.pipe(
        ofType(logInUser),
        mergeMap((action) => this.userService.logIn({ user: {username: action.usernameInput, password: action.passwordInput }})
            .pipe(
                map(response => this.succesfullLogIn(response)),
                catchError(response => of(userLoadedFail({ errorMessage: response.error })))
            )
        )
    ));

    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(loadUserWithToken),
        mergeMap(() => this.userService.getUser()
            .pipe(
                map(user => userLoadedSuccess(user)),
                catchError(response => of(userLoadedFail({ errorMessage: response.error })))
            )
        )
    ));
    
 
    constructor(
        private actions$: Actions,
        private router: Router,
        private userService: UserService,
        private _store: Store
    ) {}

    succesfullLogIn(response: SuccessfulUserResponse) {
        localStorage['token'] = response.token
        this.router.navigate(['/dashboard'])
        return userLoadedSuccess(response.user)
    }
}