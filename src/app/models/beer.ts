import { Review } from './review'

export interface Beer {
    id: number;
    name: string;
    brewery_id: number;
    style_id: number;
    description: string;
    alcohol_content: number;
    bitternes: number;
}

export interface BeerDetails {
    id: number;
    name: string;
    brewery_id: number;
    style_id: number;
    description: string;
    alcohol_content: number;
    bitternes: number;
    reviews: Review[]
}

