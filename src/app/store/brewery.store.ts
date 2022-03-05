import { createAction, createReducer, createSelector, createFeatureSelector, on, props } from '@ngrx/store';

import { Brewery } from './../models/brewery';

// actions

export const loadBreweries = createAction('[Breweries Component] Load Breweries')
export const loadBreweriesFail = createAction('[Breweries API] Breweries Loaded Fail')
export const loadBreweriesSuccess = createAction('[Breweries API] Breweries Loaded Success', props<any>())


// reducer

interface BreweryState {
    breweriesLoading: boolean
    breweriesLoaded: boolean
    breweries: Brewery[]
}

const initialState: BreweryState = {
    breweriesLoading: false,
    breweriesLoaded: false,
    breweries: []
}

export const breweryReducer = createReducer<BreweryState>(
    initialState,
    on(loadBreweries, (state) => ({...state, breweriesLoading: true})),
    on(loadBreweriesFail, (state) => ({...state, breweriesLoading: false, breweriesLoaded: false})),
    on(loadBreweriesSuccess, (state, Breweries) => ({...state, breweriesLoading: false, breweriesLoaded: true, breweries: Breweries})),
)

// selectors

export const BREWERY_FEATURE_NAME = 'brewery'

const breweryFeatureSelector = createFeatureSelector<BreweryState>(
    BREWERY_FEATURE_NAME
)

export const selectAllBreweries = createSelector(
    breweryFeatureSelector,
    (breweryState) => breweryState.breweries
)

export const selectFirstBrewery = createSelector(
    breweryFeatureSelector,
    (breweryState) => breweryState.breweries[0]
)