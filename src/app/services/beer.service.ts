import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { baseUrl } from '../baseUrl';
import { Beer, BeerDetails } from '../models/beer'


@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private beersUrl = `${baseUrl}/beers`

  authOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage['token']}`
    })
  };

  constructor( private http: HttpClient ) { }

  getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.beersUrl, this.authOptions)
  }

  getBeer(id: number): Observable<BeerDetails> {
    return this.http.get<BeerDetails>(this.beersUrl + `${id}`)
  }

  // updateBeer(beer: Beer): Observable<any> {
  //   const url = `${this.beersUrl}/${beer.id}`;
  //   return this.http.put(url, beer, this.authOptions)
  // }

  // addBeer(beer: Beer): Observable<Beer> {
  //   return this.http.post<Beer>(this.beersUrl, beer, this.authOptions)
  // }

  // deleteBeer(id: number): Observable<Beer> {
  //   const url = `${this.beersUrl}/${id}`;
  //   return this.http.delete<Beer>(url, this.authOptions)
  // }

}
