import { createAction, props } from '@ngrx/store';

import { Review, NewReview } from '../../models/review'

export const addReview = createAction('[Add Review Component] Add Review', props<NewReview>())
export const addReviewFail = createAction('[Review API] Add Review Fail', props<{errorMessage: string}>())
export const addReviewSuccess = createAction('[Review API] Add Review Success', props<Review>())