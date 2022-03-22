import { Component, OnInit, Inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { BeerDetailsComponent } from '../../beer/beer-details/beer-details.component';

import { userId } from '../../../store/app.store'
import { addReview } from '../../../store/actions/review.actions'


@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  userId$ = this._store.select(userId)
  rating: number = 0
  note: string = ''
  starCount = 0
  ratingArr = [0, 1, 2, 3, 4]
  colorControl = new FormControl('primary')


  constructor(
    public dialogRef: MatDialogRef<BeerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { beerId: number, beerName: string, breweryName: string },
    private _store: Store,
    fb: FormBuilder
  ) {}

  ngOnInit(): void {
    
  }

  onClick(rating:number) {
    console.log(rating)
    this.rating = rating
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addReview(): void {
    this.userId$.subscribe( userId => {

      let newReview = {
          user_id: userId,
          beer_id: this.data.beerId,
          rating: this.rating,
          note: this.note,
      }
      console.log(newReview)
      this._store.dispatch(addReview(newReview))
      this.dialogRef.close();
    })
    
  }

}

