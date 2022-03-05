import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { baseUrl } from '../baseUrl';
import { Brewery } from '../models/brewery';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {
  private breweriesUrl = `${baseUrl}/breweries`

  authOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage['token']}`
    })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getAllBreweries(): Observable<Brewery[]> {
    return this.http.get<Brewery[]>(this.breweriesUrl, this.authOptions)
  }

}
