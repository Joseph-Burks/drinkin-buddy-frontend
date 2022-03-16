import { createReducer, createSelector, createFeatureSelector, on, props } from '@ngrx/store';

import * as userActions from './actions/user.actions'
import * as breweryActions from './actions/brewery.actions'
import * as beerActions from './actions/beer.actions'

import { User } from '../models/user';
import { Brewery, BreweryDetails } from '../models/brewery';
import { Beer, BeerDetails } from '../models/beer';


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
    breweryLoading: boolean;
    breweryLoaded: boolean;
    brewery: BreweryDetails | null;

    beersLoading: boolean;
    beersLoaded: boolean;
    beers: Beer[];
    beersFilter: string;
    beerLoading: boolean;
    beerLoaded: boolean;
    beer: BeerDetails | null;
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
    breweryLoading: false,
    breweryLoaded: false,
    brewery: null,

    beersLoading: false,
    beersLoaded: false,
    beers: [],
    beersFilter: '',
    beerLoading: false,
    beerLoaded: false,
    beer: null,
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
    on(breweryActions.loadBrewery, (state) => ({...state, breweryLoading: true, breweryLoaded: false})),
    on(breweryActions.loadBreweryFail, (state, props) => ({...state, breweryLoading: false, errorMessage: props.errorMessage})),
    on(breweryActions.loadBrewerySuccess, (state, Brewery) => ({...state, breweryLoading: false, breweryLoaded: true, brewery: Brewery})),
    
    on(beerActions.loadBeers, (state) => ({...state, beersLoading: true})),
    on(beerActions.loadBeersFail, (state) => ({...state, beersLoading: false, beersLoaded: false})),
    on(beerActions.loadBeersSuccess, (state, props) => ({...state, beersLoading: false, beersLoaded: true, beers: props.beers})),
    on(beerActions.filterBeers, (state, props) => ({ ...state, beersFilter: props.filter})),
    on(beerActions.loadBeer, (state) => ({...state, beerLoading: true, beerLoaded: false})),
    on(beerActions.loadBeerFail, (state, props) => ({...state, beerLoading: false, errorMessage: props.errorMessage})),
    on(beerActions.loadBeerSuccess, (state, Beer) => ({...state, beerLoading: false, beerLoaded: true, beer: Beer})),

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

export const breweryLoading = createSelector(
    appFeatureSelector,
    (appState) => appState.breweryLoading
)

export const breweryLoaded = createSelector(
    appFeatureSelector,
    (appState) => appState.breweryLoaded
)

export const brewery = createSelector(
    appFeatureSelector,
    (appState) => appState.brewery
)

export const breweryName = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.brewery){
            return appState.brewery.name
        }
        return null
    }
)

export const breweryAddress = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.brewery){
            return `${appState.brewery.street}, ${appState.brewery.city}, ${appState.brewery.state}, ${appState.brewery.postal_code}`
        }
        return null
    }
)

export const breweryLongitude = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.brewery){
            return appState.brewery.longitude
        }
        return null
    }
)

export const breweryLatitude = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.brewery){
            return appState.brewery.latitude
        }
        return null
    }
)

export const breweryPhone = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.brewery){
            return appState.brewery.phone
        }
        return null
    }
)

export const breweryURL = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.brewery){
            return appState.brewery.url
        }
        return null
    }
)

export const breweryBeers = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.brewery){
            return appState.brewery.beers
        }
        return null
    }
)

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

export const beerLoading = createSelector(
    appFeatureSelector,
    (appState) => appState.beerLoading
)

export const beerLoaded = createSelector(
    appFeatureSelector,
    (appState) => appState.beerLoaded
)

export const beer = createSelector(
    appFeatureSelector,
    (appState) => appState.beer
)

export const beerName = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.beer){
            return appState.beer.name
        }
        return null
    }
)

export const beerBreweryName = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.beer){
            return appState.beer.brewery.name
        }
        return null
    }
)

export const beerStyleName = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.beer){
            return appState.beer.style.name
        }
        return null
    }
)

export const beerDescription = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.beer){
            return appState.beer.description
        }
        return null
    }
)

export const beerABV = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.beer){
            return appState.beer.alcohol_content
        }
        return null
    }
)

export const beerIBU = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.beer){
            return appState.beer.bitterness
        }
        return null
    }
)

export const beerAverageRating = createSelector(
    appFeatureSelector,
    (appState) => {
        if(appState.beer){
            let total = 0
            appState.beer.reviews.forEach(r => total += r.rating)
            return total/appState.beer.reviews.length
        }
        return null
    }
)