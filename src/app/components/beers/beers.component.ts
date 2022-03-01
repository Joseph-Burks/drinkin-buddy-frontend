import { Component, OnInit } from '@angular/core';

import { Beer } from '../../models/beer'
import { BeerService } from '../../services/beer.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {
  beers: Beer[] = []

  constructor(private beerService: BeerService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getBeers()
  }

  getBeers(): void {
    this.beerService.getBeers()
      .subscribe(beers => this.beers = beers)
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.beerService.addBeer({ name } as Beer)
      .subscribe(beer => {
        this.beers.push(beer);
      });
  }

  delete(beer: Beer): void {
    this.beers = this.beers.filter(b => b !== beer);
    this.beerService.deleteBeer(beer.id).subscribe();
  }

}
