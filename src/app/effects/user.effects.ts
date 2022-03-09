import { usernameInput } from './../store/app.store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { UserService } from '../services/user.service';

import {
    signUpUser,
    signUpUserFail,
    userLoadedSuccess,
} from '../store/app.store';

 
@Injectable()
export class UserEffects {
    
    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(signUpUser),
        mergeMap((action) => this.userService.signUp({user: {username: action.usernameInput, password: action.passwordInput}})
            .pipe(
                map(user => userLoadedSuccess(user)),
                catchError(error => {
                    let usernameError = ''
                    let passwordError = ''
                    if(error.username){
                        usernameError = `Username ${usernameError}`
                    }
                    if(error.password){
                        passwordError = `Username ${usernameError}`
                    }
                    return of(signUpUserFail({usernameError, passwordError}))
                })
            )
        )
    ));
 
    constructor(
        private actions$: Actions,
        private userService: UserService,
        private _store: Store
    ) {}
}