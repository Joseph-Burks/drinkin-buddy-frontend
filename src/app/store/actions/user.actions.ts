import { createAction, props } from '@ngrx/store';

import { User } from '../../models/user';

export const signUpUser = createAction('[Sign Up] Sign Up User', props<{usernameInput: string, passwordInput: string}>())
export const signUpUserFail = createAction('[Sign Up] Sign Up User Fail', props<{usernameError: string, passwordError: string,}>())

export const logInUser = createAction('[Log In] Log In User', props<{usernameInput: string, passwordInput: string}>())
export const userLoadedFail = createAction('[Log In] User Loaded Fail', props<{error: string}>())
export const userLoadedSuccess = createAction('[Log In] User Loaded Success', props<User>())

export const logOutUser = createAction('[Nav] Log Out User')