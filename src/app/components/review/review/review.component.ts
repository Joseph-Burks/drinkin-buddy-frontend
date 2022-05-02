import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Beer } from '../../../models/beer'
import { loadBeers, filterBeers } from '../../../store/actions/beer.actions'
import { beers } from '../../../store/app.store'

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  beers$: Observable<Beer[]> = this._store.select(beers)
  rating: number = 0
  note: string = ''
  starCount = 0
  ratingArr = [0, 1, 2, 3, 4]
  beerControl = new FormControl()



  constructor(private _store: Store) { }

  ngOnInit(): void {
    this.getBeers()
  }

  getBeers(): void {
    console.log('getting beers')
    this._store.dispatch(loadBeers())
  }

  onClick(rating:number) {
    this.rating = rating
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  filter(term: string): void {
    this._store.dispatch(filterBeers({filter: term.toLowerCase()}))
  }

}
