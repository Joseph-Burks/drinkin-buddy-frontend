import { createAction, createReducer, createSelector, createFeatureSelector, on, props } from '@ngrx/store';

import { User } from '../models/user';

// actions

export const logInUser = createAction('[Log In] Log In User', props<User>())
export const logOutUser = createAction('[Nav] Log Out User')

// reducer

interface UserState {
    userId: number | null,
    username: string,
    isMaker: boolean,
    name: string
}

const initialState: UserState = {
    userId: null,
    username: '',
    isMaker: false,
    name: ''
}

export const userReducer = createReducer<UserState>(
    initialState,
    on(logInUser, (state, User) => ({...state, userId: User.id, username: User.username, isMaker: User.isMaker, name: User.name})),
    on(logOutUser, () => initialState)
)

// selectors
export const USER_FEATURE_NAME = 'user'

const userFeatureSelector = createFeatureSelector<UserState>(
    USER_FEATURE_NAME
)

export const selectUsername = createSelector(
    userFeatureSelector,
    (userState) => userState.username
)

export const selectUserId = createSelector(
    userFeatureSelector,
    (userState) => userState.userId
)