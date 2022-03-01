import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Beer } from '../../models/beer';
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-beer-search',
  templateUrl: './beer-search.component.html',
  styleUrls: [ './beer-search.component.css' ]
})
export class BeerSearchComponent implements OnInit {
  beers$!: Observable<Beer[]>;
  private searchTerms = new Subject<string>();

  constructor(private beerService: BeerService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.beers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.beerService.searchBeers(term)),
    );
  }
}