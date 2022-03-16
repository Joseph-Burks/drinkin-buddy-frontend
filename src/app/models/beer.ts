import { Style } from './style';
import { Brewery } from './brewery';
import { Review } from './review'

export interface Beer {
    id: number;
    name: string;
    brewery_id: number;
    style_id: number;
    description: string;
    alcohol_content: number;
    bitterness: number;
}

export interface BeerDetails {
    id: number;
    name: string;
    brewery: Brewery;
    style: Style;
    description: string;
    alcohol_content: number;
    bitterness: number;
    reviews: Review[]
}

