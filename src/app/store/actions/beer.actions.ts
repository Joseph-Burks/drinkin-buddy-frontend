import { createAction, props } from '@ngrx/store';

import { Beer, BeerDetails, NewBeer } from '../../models/beer'

export const loadBeers = createAction('[Beers Component] Load All Beers')
export const loadBeersFail = createAction('[Beers API] Beers Loaded Fail')
export const loadBeersSuccess = createAction('[Beers API] Beers Loaded Success', props<{beers: Beer[]}>())
export const filterBeers = createAction('[Beers Component] Filter Beers', props<{filter: string}>())

export const addBeer = createAction('[Brewery Details Component] Add Beer', props<NewBeer>())
export const addBeerFail = createAction('[Beers API] Add Beer Fail', props<{errorMessage: string}>())
export const addBeerSuccess = createAction('[Beers API] Add Beer Success', props<BeerDetails>())

export const loadBeer = createAction('[Beer Details Component] Load Beer', props<{id: number}>())
export const loadBeerFail = createAction('[Beers API] Load Beer Fail', props<{errorMessage: string}>())
export const loadBeerSuccess = createAction('[Beers API] Load Beer Success', props<BeerDetails>())
