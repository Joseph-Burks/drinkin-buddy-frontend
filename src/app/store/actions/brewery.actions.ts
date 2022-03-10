import { createAction, props } from '@ngrx/store';

import { Brewery } from '../../models/brewery'

export const loadBreweries = createAction('[Breweries Component] Load Breweries')
export const loadBreweriesFail = createAction('[Breweries API] Breweries Loaded Fail')
export const loadBreweriesSuccess = createAction('[Breweries API] Breweries Loaded Success', props<{breweries: Brewery[]}>())
export const filterBreweries = createAction('[Breweries Component] Filter Breweries', props<{filter: string}>())