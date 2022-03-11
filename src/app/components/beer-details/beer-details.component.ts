import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Beer } from '../../models/beer'
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {
  @Input() beer?: Beer

  constructor(
    private route: ActivatedRoute,
    private beerService: BeerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // this.getBeer()
  }

  // getBeer(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.beerService.getBeer(id)
  //     .subscribe(beer => this.beer = beer);
  // }

  // goBack(): void {
  //   this.location.back()
  // }

  // save(): void {
  //   if (this.beer) {
  //     this.beerService.updateBeer(this.beer)
  //       .subscribe(() => this.goBack());
  //   }
  // }

}
