import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { errorMessage } from '../../store/app.store';
import { logInUser } from '../../store/actions/user.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

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

  logIn(): void {
    let usernameInput = this.userForm.value.username.trim()
    let passwordInput = this.userForm.value.password.trim()

    const userInput = {
      usernameInput,
      passwordInput
    }

    this._store.dispatch(logInUser(userInput))
  }

}
