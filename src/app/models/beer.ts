import { Brewery, BreweryDetails } from './brewery';
import { Review } from './review'

export interface Beer {
    id: number;
    name: string;
    brewery: Brewery;
    style: string;
    description: string;
    alcohol_content: number;
    bitterness: number;
}

export interface NewBeer {
    name: string;
    brewery_id: number;
    style: string;
    description: string;
    alcohol_content: number | null;
    bitterness: number | null;
}

export interface BeerDetails {
    id: number;
    name: string;
    brewery: Brewery;
    style: string;
    description: string;
    alcohol_content: number;
    bitterness: number;
    reviews: Review[]
}

