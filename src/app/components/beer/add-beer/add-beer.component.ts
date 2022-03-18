import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { BreweryDetailsComponent } from './../../brewery/brewery-details/brewery-details.component';
import { addBeer } from '../../../store/actions/beer.actions'

@Component({
  selector: 'app-add-beer',
  templateUrl: './add-beer.component.html',
  styleUrls: ['./add-beer.component.css']
})
export class AddBeerComponent implements OnInit {
  name: string = ''
  style: string = ''
  description: string = ''
  alcohol_content: number |  null = null
  bitterness: number | null = null 

  constructor(
    public dialogRef: MatDialogRef<BreweryDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { breweryId: number, breweryName: string },
    public _store: Store
  ) { }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    let newBeer = {
      name: this.name,
      brewery_id: this.data.breweryId,
      style: this.style,
      description: this.description,
      alcohol_content: this.alcohol_content,
      bitterness: this.bitterness
    }
    this._store.dispatch(addBeer(newBeer))
    this.dialogRef.close();
  }

}
