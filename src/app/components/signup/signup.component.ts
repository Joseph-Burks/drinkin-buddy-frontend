import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { signUpUser, signUpUserFail } from '../../store/actions/user.actions'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change'
    }),
    password: new FormControl('', {
      validators: [Validators.minLength(6), Validators.required],
      updateOn: 'change'
    })
  })

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
  }

  getUsernameErrorMessage() {
    return 'You must enter a value';
  }

  getPasswordErrorMessage() {
    if(this.userForm.controls['password'].getError('minlength')){
      return 'Must be at least 6 characters'
    }

    return 'You must enter a value'
    
  }

  signUp(): void {
    let usernameInput = this.userForm.value.username.trim()
    let passwordInput = this.userForm.value.password.trim()

    const newUser = {
        usernameInput,
        passwordInput
    }

    this._store.dispatch(signUpUser(newUser))

  }

}
