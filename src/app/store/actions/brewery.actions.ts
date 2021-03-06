import { createAction, props } from '@ngrx/store';

import { Brewery, NewBrewery, BreweryDetails } from '../../models/brewery'

export const loadTwentyBreweries = createAction('[Breweries Component] Load Twenty Breweries')
export const loadBreweries = createAction('[Breweries Component] Load Breweries')
export const loadBreweriesFail = createAction('[Breweries API] Breweries Loaded Fail')
export const loadBreweriesSuccess = createAction('[Breweries API] Breweries Loaded Success', props<{breweries: Brewery[]}>())
export const filterBreweries = createAction('[Breweries Component] Filter Breweries', props<{filter: string}>())

export const addBrewery = createAction('[Add Brewery Component] Add Brewery', props<NewBrewery>())
export const addBreweryFail = createAction('[Breweries API] Add Brewery Fail', props<{errorMessage: string}>())
export const addBrewerySuccess = createAction('[Breweries API] Get Brewery Success', props<Brewery>())

export const loadBrewery = createAction('[Brewery Details Component] Load Brewery', props<{id: number}>())
export const loadBreweryFail = createAction('[Breweries API] Load Brewery Fail', props<{errorMessage: string}>())
export const loadBrewerySuccess = createAction('[Breweries API] Load Brewery Success', props<BreweryDetails>())
