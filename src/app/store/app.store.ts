import { createReducer, createSelector, createFeatureSelector, on, props } from '@ngrx/store';

import * as userActions from './actions/user.actions'
import * as breweryActions from './actions/brewery.actions'
import * as beerActions from './actions/beer.actions'

import { User } from '../models/user';
import { Brewery } from '../models/brewery';
import { Beer } from '../models/beer';


// reducer

interface AppState {
    errorMessage: string;

    usernameInput: string;
    passwordInput: string;
    usernameError: string;
    passwordError: string;
    userLoading: boolean;
    userLoaded: boolean
    user: User | null;


    breweriesLoading: boolean;
    breweriesLoaded: boolean;
    breweries: Brewery[];
    breweriesFilter: string;

    beersLoading: boolean;
    beersLoaded: boolean;
    beers: Beer[];
    beersFilter: string;
}

const initialState: AppState = {
    errorMessage: '',

    usernameInput: '',
    passwordInput: '',
    usernameError: '',
    passwordError: '',
    userLoading: false,
    userLoaded: false,
    user: null,

    breweriesLoading: false,
    breweriesLoaded: false,
    breweries: [],
    breweriesFilter: '',

    beersLoading: false,
    beersLoaded: false,
    beers: [],
    beersFilter: ''
}

export const appReducer = createReducer<AppState>(
    initialState,
    on(userActions.signUpUser, (state, props) => ({...state, usernameIput: props.usernameInput, passwordInput: props.passwordInput, userLoading: true})),
    on(userActions.signUpUserFail, (state, props) => ({...state, usernameError: props.usernameError, passwordError: props.passwordError, userLoading: false})),
    on(userActions.loadUserWithToken, (state, props) => ({...state, userLoading: true})),
    on(userActions.logInUser, (state, props) => ({...state, usernameIput: props.usernameInput, passwordInput: props.passwordInput, userLoading: true})),
    on(userActions.userLoadedFail, (state, props) => ({...state, errorMessage: props.error, userLoading: false})),
    on(userActions.userLoadedSuccess, (state, User) => ({...state, user: User, userLoading: false, userLoaded: true, usernameError: '', passwordError: '', errorMessage: ''})),
    on(userActions.logOutUser, () => initialState),

    on(breweryActions.loadBreweries, (state) => ({...state, breweriesLoading: true})),
    on(breweryActions.loadBreweriesFail, (state) => ({...state, breweriesLoading: false, breweriesLoaded: false})),
    on(breweryActions.loadBreweriesSuccess, (state, props) => ({...state, breweriesLoading: false, breweriesLoaded: true, breweries: props.breweries})),
    on(breweryActions.filterBreweries, (state, props) => ({ ...state, breweriesFilter: props.filter})),
    on(breweryActions.addBreweryFail, (state, props) => ({...state, errorMessage: props.errorMessage})),
    on(breweryActions.addBrewerySuccess, (state, Brewery) => ({...state, breweries: [...state.breweries, Brewery], errorMessage: ''})),

    on(beerActions.loadBeers, (state) => ({...state, beersLoading: true})),
    on(beerActions.loadBeersFail, (state) => ({...state, beersLoading: false, beersLoaded: false})),
    on(beerActions.loadBeersSuccess, (state, props) => ({...state, beersLoading: false, beersLoaded: true, beers: props.beers})),
    on(beerActions.filterBeers, (state, props) => ({ ...state, beersFilter: props.filter})),


)


// selectors

export const APP_FEATURE_NAME = 'user'

const appFeatureSelector = createFeatureSelector<AppState>(
    APP_FEATURE_NAME
)

export const errorMessage = createSelector(
    appFeatureSelector,
    (appState) => appState.errorMessage
)

// User
export const username = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.user){
            return appState.user.username
        }
        return null
    }
)

export const userId = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.user){
            return appState.user.id
        }
        return null
    }
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
    
export const usernameInput = createSelector(
    appFeatureSelector,
    (appState) => appState.usernameInput
)

export const userLoaded = createSelector(
    appFeatureSelector,
    (appState) => appState.userLoaded
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
    (appState) => appState.breweries.filter(brewery => brewery.name.toLowerCase().startsWith(appState.breweriesFilter))
)

// export const brewery = createSelector(
//     appFeatureSelector,
//     (appState) => appState.breweries.filter(brewery => brewery.name.toLowerCase().startsWith(appState.breweriesFilter))
// )

// Beers

export const beersLoading = createSelector(
    appFeatureSelector,
    (appState) => appState.beersLoading
)

export const beersLoaded = createSelector(
    appFeatureSelector,
    (appState) => appState.beersLoaded
)

export const beers = createSelector(
    appFeatureSelector,
    (appState) => appState.beers.filter(beer => beer.name.toLowerCase().startsWith(appState.beersFilter))
)

