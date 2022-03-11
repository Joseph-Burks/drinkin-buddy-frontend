import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { errorMessage } from '../../../store/app.store'
import { addBrewery } from '../../../store/actions/brewery.actions'

import { NewBrewery } from '../../../models/brewery';

@Component({
  selector: 'app-add-brewery',
  templateUrl: './add-brewery.component.html',
  styleUrls: ['./add-brewery.component.css']
})
export class AddBreweryComponent implements OnInit {
  errorMessage$ = this._store.select(errorMessage)
  name: string = ''
  street: string = ''
  city: string = ''
  state: string = ''
  postalCode: string = ''
  country: string = ''
  longitude: string = ''
  latitude: string = ''
  phone: string = ''
  url: string = ''

  constructor(private _store: Store) { }

  ngOnInit(): void {
  }

  addBrewery(): void {

    let newBrewery: NewBrewery = {
      name: this.name.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ').trim(),
      street: this.street.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ').trim(),
      city: this.city.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ').trim(),
      state: this.state.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ').trim(),
      postal_code: this.postalCode,
      country: this.country.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ').trim(),
      longitude: this.longitude,
      latitude: this.latitude,
      phone: this.phone,
      url: this.url
    }

    this._store.dispatch(addBrewery(newBrewery))

  }

}
