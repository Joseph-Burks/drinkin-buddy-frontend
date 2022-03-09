import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { baseUrl } from '../baseUrl';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userTokenUrl = `${baseUrl}/get_user`
  private userLogInUrl = `${baseUrl}/login`
  private usersUrl = `${baseUrl}/users`

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  authOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage['token']}`
    })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getUser(): Observable<User> {
    return this.http.get<User>(this.userTokenUrl, this.authOptions)
      .pipe(
        catchError(this.handleError<User>('getBeers'))
      )
  }

  signUp(newUser: any): Observable<any> {
    console.log('signing up')
    return this.http.post<any>(this.usersUrl, newUser, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('createUser'))
      )
  }

  logIn(userInfo: any): Observable<any> {
    return this.http.post<any>(this.userLogInUrl, userInfo, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('LogInUser'))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(error as T);
    }
  }
}
