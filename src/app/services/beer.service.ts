import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { baseUrl } from '../baseUrl';
import { Beer, BeerDetails, NewBeer } from '../models/beer'
import { Interest } from '../models/interest';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private beersUrl = `${baseUrl}/beers/`
  private interestsUrl = `${baseUrl}/interests/`

  authOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage['token']}`
    })
  };

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.beersUrl, this.authOptions)
  }

  getFirstTwenty(): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${baseUrl}/beers-20`, this.authOptions)
  }

  getBeer(id: number): Observable<BeerDetails> {
    return this.http.get<BeerDetails>(this.beersUrl + `${id}`, this.authOptions)
  }

  addBeer(beer: NewBeer): Observable<BeerDetails> {
    console.log(beer)
    return this.http.post<BeerDetails>(this.beersUrl, { beer }, this.authOptions)
  }

  addInterest(id: number): Observable<User> {
    return this.http.post<User>(this.interestsUrl, { interest: { beer_id: id } }, this.authOptions)
  }

  deleteInterest(id: number): Observable<User> {
    return this.http.post<User>(this.interestsUrl + 'remove', { interest: { beer_id: id } }, this.authOptions)
  }

  // updateBeer(beer: Beer): Observable<any> {
  //   const url = `${this.beersUrl}/${beer.id}`;
  //   return this.http.put(url, beer, this.authOptions)
  // }


  // deleteBeer(id: number): Observable<Beer> {
  //   const url = `${this.beersUrl}/${id}`;
  //   return this.http.delete<Beer>(url, this.authOptions)
  // }

}
