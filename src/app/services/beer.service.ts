import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Beer } from '../models/beer'
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private beersUrl = 'http://localhost:3000/beers'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.beersUrl)
      .pipe(
        tap(_ => this.log('fetched beers')),
        catchError(this.handleError<Beer[]>('getBeers', []))
      )
  }

  getBeer(id: number): Observable<Beer> {
    const url = `${this.beersUrl}/${id}`;
    return this.http.get<Beer>(url)
      .pipe(
        tap(_ => this.log(`Fetched beer id=${id}`)),
        catchError(this.handleError<Beer>(`getBeer id=${id}`))
      );
  }

  updateBeer(beer: Beer): Observable<any> {
    const url = `${this.beersUrl}/${beer.id}`;
    return this.http.put(url, beer, this.httpOptions).pipe(
      tap(_ => this.log(`updated beer id=${beer.id}`)),
      catchError(this.handleError<any>('updateBeer'))
    );
  }

  addBeer(beer: Beer): Observable<Beer> {
    return this.http.post<Beer>(this.beersUrl, beer, this.httpOptions).pipe(
      tap((newBeer: Beer) => this.log(`added beer w/ id=${newBeer.id}`)),
      catchError(this.handleError<Beer>('addBeer'))
    );
  }

  deleteBeer(id: number): Observable<Beer> {
    const url = `${this.beersUrl}/${id}`;

    return this.http.delete<Beer>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted beer id=${id}`)),
      catchError(this.handleError<Beer>('deleteBeer'))
    );
  }

  searchBeers(term: string): Observable<Beer[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Beer[]>(`${this.beersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found beers matching "${term}"`) :
        this.log(`no beers matching "${term}"`)),
      catchError(this.handleError<Beer[]>('searchBeers', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`BeerService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

}
