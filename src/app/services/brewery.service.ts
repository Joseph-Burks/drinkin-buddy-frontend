import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { baseUrl } from '../baseUrl';
import { Brewery, NewBrewery, BreweryDetails } from '../models/brewery';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {
  private breweriesUrl = `${baseUrl}/breweries/`

  authOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage['token']}`
    })
  };

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Brewery[]> {
    return this.http.get<Brewery[]>(this.breweriesUrl, this.authOptions)
  }

  addNew(newBrewery: NewBrewery): Observable<Brewery> {
    return this.http.post<Brewery>(this.breweriesUrl, {brewery: newBrewery}, this.authOptions )
  }

  getBrewery(id: number): Observable<BreweryDetails> {
    console.log(id)
    return this.http.get<BreweryDetails>(this.breweriesUrl + `${id}`, this.authOptions )
  }

}
