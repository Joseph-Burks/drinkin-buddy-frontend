import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { baseUrl } from '../baseUrl';
import { Review, NewReview } from './../models/review';
import { User } from './../models/user'

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsUrl = `${baseUrl}/reviews/`

  authOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage['token']}`
    })
  };
  constructor( private http: HttpClient ) { }

  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(this.reviewsUrl, this.authOptions)
  }

  addNew(newReview: NewReview): Observable<User> {
    return this.http.post<User>(this.reviewsUrl, {review: newReview}, this.authOptions )
  }
}
