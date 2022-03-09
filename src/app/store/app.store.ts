import { createAction, createReducer, createSelector, createFeatureSelector, on, props } from '@ngrx/store';

import { User } from '../models/user';
import { Brewery } from '../models/brewery';

// actions

export const signUpUser = createAction('[Sign Up] Sign Up User', props<{usernameInput: string, passwordInput: string}>())
export const signUpUserFail = createAction('[Sign Up] Sign Up User Fail', props<{usernameError: string, passwordError: string,}>())
export const logInUser = createAction('[Log In] Log In User', props<{usernameInput: string, passwordInput: string}>())
export const userLoadedFail = createAction('[Log In] User Loaded Fail', props<{error: string}>())
export const userLoadedSuccess = createAction('[Log In] User Loaded Success', props<User>())
export const logOutUser = createAction('[Nav] Log Out User')

export const loadBreweries = createAction('[Breweries Component] Load Breweries')
export const loadBreweriesFail = createAction('[Breweries API] Breweries Loaded Fail')
export const loadBreweriesSuccess = createAction('[Breweries API] Breweries Loaded Success', props<{breweries: Brewery[]}>())
export const filterBreweries = createAction('[Breweries Component] Filter Breweries', props<{filter: string}>())


// reducer

interface AppState {
    usernameInput: string;
    passwordInput: string;
    usernameError: string;
    passwordError: string;
    logInError: string;
    userLoading: boolean;
    userLoaded: boolean
    userId: number | null;
    username: string;


    breweriesLoading: boolean;
    breweriesLoaded: boolean;
    breweries: Brewery[];
    breweriesFilter: string;
}

const initialState: AppState = {
    usernameInput: '',
    passwordInput: '',
    usernameError: '',
    passwordError: '',
    logInError: '',
    userLoading: false,
    userLoaded: false,
    userId: null,
    username: '',

    breweriesLoading: false,
    breweriesLoaded: false,
    breweries: [],
    breweriesFilter: ''
}

export const appReducer = createReducer<AppState>(
    initialState,
    on(signUpUser, (state, props) => ({...state, usernameIput: props.usernameInput, passwordInput: props.passwordInput, userLoading: true})),
    on(signUpUserFail, (state, props) => ({...state, usernameError: props.usernameError, passwordError: props.passwordError, userLoading: false})),
    on(logInUser, (state, props) => ({...state, usernameIput: props.usernameInput, passwordInput: props.passwordInput, userLoading: true})),
    on(userLoadedFail, (state, props) => ({...state, logInError: props.error, userLoading: false})),
    on(userLoadedSuccess, (state, User) => ({...state, userId: User.id, username: User.username, userLoading: false, userLoaded: true, usernameError: '', passwordError: ''})),
    on(logOutUser, () => initialState),
    on(loadBreweries, (state) => ({...state, breweriesLoading: true})),
    on(loadBreweriesFail, (state) => ({...state, breweriesLoading: false, breweriesLoaded: false})),
    on(loadBreweriesSuccess, (state, props) => ({...state, breweriesLoading: false, breweriesLoaded: true, breweries: props.breweries})),
    on(filterBreweries, (state, props) => ({ ...state, breweriesFilter: props.filter})),
)


// selectors

export const APP_FEATURE_NAME = 'user'

const appFeatureSelector = createFeatureSelector<AppState>(
    APP_FEATURE_NAME
)

// User
export const selectUsername = createSelector(
    appFeatureSelector,
    (appState) => appState.username
)

export const selectUserId = createSelector(
    appFeatureSelector,
    (appState) => appState.userId
)

export const usernameInput = createSelector(
    appFeatureSelector,
    (appState) => appState.usernameInput
)

export const passwordInput = createSelector(
    appFeatureSelector,
    (appState) => appState.passwordInput
)

export const usernameError = createSelector(
    appFeatureSelector,
    (appState) => appState.usernameError
)

export const passwordError = createSelector(
    appFeatureSelector,
    (appState) => appState.passwordError
)

// Breweries
export const breweriesLoading = createSelector(
    appFeatureSelector,
    (appState) => appState.breweriesLoading
)

export const breweriesLoaded = createSelector(
    appFeatureSelector,
    (appState) => appState.breweriesLoaded
)

export const breweries = createSelector(
    appFeatureSelector,
    (appState) => appState.breweries.filter(brewery => brewery.name.startsWith(appState.breweriesFilter))
)

