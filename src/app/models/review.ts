import { Beer } from './beer'

export interface Review {
    id: number;
    user_id: number;
    beer_id: number;
    rating: number;
    note: string;
}

export interface UserReview {
    id: number;
    rating: number;
    note: string;
    beer: Beer;
}

export interface NewReview {
    user_id: number | null;
    beer_id: number | null;
    rating: number | null;
    note: string;
}