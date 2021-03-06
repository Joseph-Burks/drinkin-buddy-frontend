import { Beer } from './beer';

export interface Brewery {
    id: number;
    name: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    longitude: string;
    latitude: string;
    phone: string;
    url: string;
}

export interface NewBrewery {
    name: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    longitude: string;
    latitude: string;
    phone: string;
    url: string;
}

export interface BreweryDetails {
    id: number;
    name: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    longitude: string;
    latitude: string;
    phone: string;
    url: string;
    beers: Beer[];
}