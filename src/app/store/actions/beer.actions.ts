import { createAction, props } from '@ngrx/store';

import { Beer } from '../../models/beer'

export const loadBeers = createAction('[Beers Component] Load All Beers')
export const loadBeersFail = createAction('[Beers API] Beers Loaded Fail')
export const loadBeersSuccess = createAction('[Beers API] Beers Loaded Success', props<{beers: Beer[]}>())
export const filterBeers = createAction('[Beers Component] Filter Beers', props<{filter: string}>())